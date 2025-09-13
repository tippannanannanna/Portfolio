export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    GITHUB_TOKEN,
    GITHUB_OWNER,
    GITHUB_REPO,
    GITHUB_BRANCH = 'main',
  } = process.env;

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    res.status(500).json({ error: 'GitHub environment variables not configured' });
    return;
  }

  try {
    const post = req.body && (typeof req.body === 'string' ? JSON.parse(req.body) : req.body);
    if (!post || !post.id || !post.title || !post.description || !post.content) {
      res.status(400).json({ error: 'Missing required post fields' });
      return;
    }

    // Prepare paths
    const postsJsonPath = 'blog-posts.json';
    const imagesBasePath = `public/assets/blog/${post.id}`;

    // Helper: GitHub API request
    async function gh(path, options = {}) {
      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(path)}?ref=${GITHUB_BRANCH}`;
      const resp = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          ...(options.headers || {}),
        },
      });
      return resp;
    }

    // Get current blog-posts.json
    let posts = [];
    let postsFileSha = null;
    {
      const resp = await gh(postsJsonPath);
      if (resp.status === 200) {
        const data = await resp.json();
        postsFileSha = data.sha;
        const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
        try { posts = JSON.parse(decoded); } catch (_) { posts = []; }
      } else if (resp.status === 404) {
        posts = [];
      } else {
        const t = await resp.text();
        res.status(500).json({ error: 'Failed to read blog-posts.json', detail: t });
        return;
      }
    }

    // Save cover image if provided as data URL
    async function saveDataUrlToRepo(dataUrl, outPath) {
      const base64 = dataUrl.split(',')[1];
      const fileResp = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(outPath)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
        },
        body: JSON.stringify({
          message: `Add blog asset ${outPath}`,
          content: base64,
          branch: GITHUB_BRANCH,
        }),
      });
      const j = await fileResp.json();
      if (!fileResp.ok) {
        throw new Error(`Failed to save image: ${j.message || fileResp.status}`);
      }
      // Return CDN-friendly URL
      return `https://cdn.jsdelivr.net/gh/${GITHUB_OWNER}/${GITHUB_REPO}@${GITHUB_BRANCH}/${outPath}`;
    }

    // Process inline images in content (data URLs) and replace with committed URLs
    async function processInlineImages(html) {
      const dataUrlRegex = /<img\s+[^>]*src=["'](data:image\/(?:png|jpeg|jpg|gif|webp);base64,[^"']+)["'][^>]*>/gi;
      const replacements = [];
      let match;
      let index = 0;
      while ((match = dataUrlRegex.exec(html)) !== null) {
        const dataUrl = match[1];
        const ext = (dataUrl.startsWith('data:image/png') && 'png') ||
                    (dataUrl.startsWith('data:image/jpeg') && 'jpg') ||
                    (dataUrl.startsWith('data:image/jpg') && 'jpg') ||
                    (dataUrl.startsWith('data:image/gif') && 'gif') ||
                    (dataUrl.startsWith('data:image/webp') && 'webp') || 'png';
        const filename = `inline_${index}.${ext}`;
        const outPath = `${imagesBasePath}/${filename}`;
        const url = await saveDataUrlToRepo(dataUrl, outPath);
        replacements.push({ dataUrl, url });
        index += 1;
      }
      let out = html;
      for (const r of replacements) {
        out = out.replaceAll(r.dataUrl, r.url);
      }
      return out;
    }

    // Handle cover image
    if (post.coverImage && post.coverImage.src && post.coverImage.src.startsWith('data:')) {
      const extGuess = post.coverImage.src.includes('image/jpeg') ? 'jpg'
        : post.coverImage.src.includes('image/png') ? 'png'
        : post.coverImage.src.includes('image/webp') ? 'webp' : 'png';
      const coverPath = `${imagesBasePath}/cover.${extGuess}`;
      const coverUrl = await saveDataUrlToRepo(post.coverImage.src, coverPath);
      post.coverImage.src = coverUrl;
    }

    // Process inline images in content
    post.content = await processInlineImages(post.content);

    // Upsert post
    const map = new Map(posts.map(p => [p.id, p]));
    map.set(post.id, post);
    const updatedPosts = Array.from(map.values());

    // Commit updated blog-posts.json
    const updatedContentBase64 = Buffer.from(JSON.stringify(updatedPosts, null, 2), 'utf-8').toString('base64');
    const commitResp = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(postsJsonPath)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `chore(blog): upsert post ${post.id}`,
        content: updatedContentBase64,
        branch: GITHUB_BRANCH,
        sha: postsFileSha || undefined,
      }),
    });
    const commitJson = await commitResp.json();
    if (!commitResp.ok) {
      res.status(500).json({ error: 'Failed to commit blog-posts.json', detail: commitJson });
      return;
    }

    res.status(200).json({ ok: true, post, posts: updatedPosts });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
}




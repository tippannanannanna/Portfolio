export default async function handler(req, res) {
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
    const resp = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent('blog-posts.json')}?ref=${GITHUB_BRANCH}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
      }
    });
    if (resp.status === 404) {
      res.status(200).json([]);
      return;
    }
    if (!resp.ok) {
      const t = await resp.text();
      res.status(500).json({ error: 'Failed to fetch posts', detail: t });
      return;
    }
    const data = await resp.json();
    const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
    const posts = JSON.parse(decoded || '[]');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
}




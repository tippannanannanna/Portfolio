# Tippanna Bangi's Portfolio Website

A modern, responsive portfolio website with an integrated blog system, built with HTML, CSS, JavaScript, and Three.js for 3D animations.

## 🌟 Features

- **Modern Design**: Clean, professional design with dark theme and teal accents
- **3D Background**: Interactive particle animation using Three.js
- **Responsive Layout**: Mobile-first design that works on all devices
- **Blog System**: Complete blog management with admin panel
- **GitHub Integration**: Automatic deployment and content management
- **SEO Optimized**: Meta tags, structured data, and performance optimized

## 🚀 Live Demo

- **Portfolio**: [https://tippannanannanna.github.io/ResumeBuilding/](https://tippannanannanna.github.io/ResumeBuilding/)
- **Blog**: [https://tippannanannanna.github.io/ResumeBuilding/blog.html](https://tippannanannanna.github.io/ResumeBuilding/blog.html)
- **Admin Panel**: [https://tippannanannanna.github.io/ResumeBuilding/admin.html](https://tippannanannanna.github.io/ResumeBuilding/admin.html)

## 📁 Project Structure

```
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── api/
│   ├── get-posts.js            # API to fetch blog posts from GitHub
│   └── save-post.js            # API to save blog posts to GitHub
├── Index.html                  # Main portfolio page
├── blog.html                   # Blog listing page
├── post.html                   # Individual blog post page
├── admin.html                  # Blog management admin panel
├── blog-posts.json            # Blog posts data (backup)
├── package.json               # Node.js dependencies
├── vercel.json                # Vercel serverless functions config
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN)
- **3D Graphics**: Three.js
- **Icons**: Lucide Icons (SVG)
- **Fonts**: Google Fonts (Inter)
- **Deployment**: GitHub Pages + GitHub Actions
- **Backend**: Vercel Serverless Functions
- **Version Control**: Git + GitHub

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Git
- GitHub account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tippannanannanna/ResumeBuilding.git
   cd ResumeBuilding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📝 Blog Management

### Admin Panel Access

1. Navigate to `/admin.html`
2. Login with credentials:
   - **Username**: `admin`
   - **Password**: `tippanna2025`

### Creating Blog Posts

1. Access the admin panel
2. Fill in the required fields:
   - Title
   - Description
   - Content (HTML supported)
   - Category
   - Cover Image (optional)
3. Click "Publish Post"

### Blog Features

- **Rich Text Editor**: HTML support for formatting
- **Image Upload**: Automatic image processing and CDN hosting
- **Categories**: Organize posts by topics
- **SEO Friendly**: Meta descriptions and alt texts
- **Responsive Design**: Mobile-optimized reading experience

## 🔧 Configuration

### GitHub Integration

The blog system automatically saves posts to your GitHub repository:

- **Repository**: `tippannanannanna/ResumeBuilding`
- **Branch**: `main`
- **File**: `blog-posts.json`

### Environment Variables

**⚠️ SECURITY WARNING**: Never commit your GitHub token to the repository!

For local development, create a `.env` file in the root directory:

```bash
# .env file (DO NOT COMMIT THIS FILE)
GITHUB_TOKEN=your_github_token_here
GITHUB_OWNER=tippannanannanna
GITHUB_REPO=ResumeBuilding
GITHUB_BRANCH=main
```

**For Vercel Deployment:**
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token
   - `GITHUB_OWNER`: tippannanannanna
   - `GITHUB_REPO`: ResumeBuilding
   - `GITHUB_BRANCH`: main

**For GitHub Pages:**
The blog functionality will fall back to localStorage if GitHub API is not available.

## 🚀 Deployment

### GitHub Pages (Automatic)

The site is automatically deployed to GitHub Pages when you push to the `main` branch:

1. Push your changes to GitHub
2. GitHub Actions will build and deploy automatically
3. Your site will be available at: `https://tippannanannanna.github.io/ResumeBuilding/`

### Manual Deployment

```bash
npm run deploy
```

## 🎨 Customization

### Colors and Styling

The site uses Tailwind CSS with a custom color scheme:
- **Primary**: Teal (#0D9488)
- **Background**: Slate (#0F172A)
- **Text**: Slate variants

### Content Updates

1. **Portfolio Content**: Edit `Index.html`
2. **Blog Posts**: Use the admin panel
3. **Navigation**: Update navigation links in all HTML files

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔍 SEO Features

- Meta tags for social sharing
- Structured data markup
- Optimized images with alt texts
- Clean URL structure
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tippanna Bangi**
- Portfolio: [https://tippannanannanna.github.io/ResumeBuilding/](https://tippannanannanna.github.io/ResumeBuilding/)
- Email: Tippannahbangi@gmail.com
- LinkedIn: [Tippanna Bangi](https://in.linkedin.com/in/tippanna-bangi-2b1a77328)

## 🙏 Acknowledgments

- Three.js for 3D graphics
- Tailwind CSS for styling
- Google Fonts for typography
- GitHub for hosting and CI/CD
- Vercel for serverless functions

---

**Note**: This portfolio website showcases my skills in web development, design, and content management. It's built with modern web technologies and follows best practices for performance, accessibility, and SEO.

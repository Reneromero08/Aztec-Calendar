# Deployment Guide

This is a **static website** - ready to deploy to any HTTP server with no build process required.

## Pre-Deployment Checklist

Before deploying to production, verify the site works locally:

- [ ] Open `index.html` in a web browser (Chrome, Firefox, Safari, Edge)
- [ ] Navigate through all pages: Calendar, Guides, Guide (Aztec Calendar)
- [ ] Check browser console for errors (F12 → Console tab)
- [ ] Test all interactive elements:
  - [ ] Mobile menu toggle (resize to mobile view or use responsive mode)
  - [ ] Navigation links work correctly
  - [ ] Calendar interactions function properly
  - [ ] Hover effects on cards display correctly
- [ ] Verify styles load correctly (no unstyled text or missing colors)
- [ ] Check that Google Fonts load (text should use Playfair Display and Source Sans 3)
- [ ] Test keyboard navigation (Tab through interactive elements, Escape to close menu)
- [ ] Verify all images display (SVGs and favicon)

## Directory Structure (Must Be Preserved)

```
.
├── index.html                    # Home page
├── calendar.html                 # Calendar page
├── guide.html                    # Guides page
├── guide-aztec-calendar.html     # Deep dive guide
├── assets/                       # CRITICAL: Must preserve this folder
│   ├── css/
│   │   └── styles.css           # All styling
│   ├── images/
│   │   ├── globe.svg
│   │   ├── window.svg
│   │   ├── file.svg
│   │   └── favicon.ico
│   ├── js/
│   │   └── guide-data.js        # Data and rendering logic
│   └── data/
│       ├── day-signs.js
│       ├── tonalpohualli-numbers.js
│       └── xiuhpohualli-months.js
├── docs/                         # Documentation (optional)
└── [other docs/config files]     # Optional - not needed for site to work
```

**⚠️ IMPORTANT:** Upload all HTML files and the entire `assets/` directory structure exactly as shown. Links use relative paths (e.g., `./assets/css/styles.css`), so the directory layout must be preserved.

## External CDN Dependencies

The site uses one external resource that requires internet access:

- **Google Fonts** (`fonts.googleapis.com`) - Typography for Playfair Display, Source Sans 3, and IBM Plex Mono

If the CDN is unavailable, the page will display with system fallback fonts (serif, sans-serif, monospace), which is acceptable but not ideal aesthetically.

## Option 1: FTP/SFTP (Traditional Web Hosting)

For hosting on a traditional shared host with FTP/SFTP access:

### Using an FTP Client (FileZilla, WinSCP, Cyberduck)

1. **Connect to your server**
   - Host: Your FTP/SFTP hostname
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (FTP) or 22 (SFTP)

2. **Navigate to the web root** (usually `public_html/`, `httpdocs/`, or `/var/www/html/`)

3. **Upload all files** from your local project folder:
   - Upload `index.html`, `calendar.html`, `guide.html`, `guide-aztec-calendar.html`
   - Upload the entire `assets/` folder (preserving the directory structure)

4. **Verify upload:**
   - Check that all files appear in the correct locations
   - File permissions are usually automatically set correctly (644 for files, 755 for directories)

5. **Test the deployment:**
   - Visit `https://yourdomain.com/` in a web browser
   - Test all pages and interactive features
   - Check browser console for errors

### Using Command Line (SFTP)

```bash
# Connect to your server
sftp username@ftp.yourdomain.com

# Navigate to web root
cd public_html

# Upload the project
put -r * .

# Exit
quit
```

### Using rsync (Advanced)

```bash
rsync -avz --delete ./ username@ftp.yourdomain.com:~/public_html/
```

## Option 2: GitHub Pages

Deploy directly from a GitHub repository with automatic updates on each push.

### Setup (One-time)

1. **Create a GitHub repository** (or use an existing one)
   - Repository can be public or private

2. **Configure GitHub Pages in Settings:**
   - Go to Settings → Pages
   - Source: Select the branch containing your files (e.g., `main`)
   - Folder: Select `/root` (for files in repository root)
   - Custom domain (optional): Enter your domain
   - Save

3. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Add deployment files"
   git push origin main
   ```

### Access Your Site

- **Default URL:** `https://username.github.io/repository-name/`
- **Custom domain:** `https://yourdomain.com/` (if configured)

### Updating Content

Simply commit and push changes - GitHub Pages automatically deploys:

```bash
# Make changes to HTML files
# Edit index.html, calendar.html, etc.

# Commit and push
git add .
git commit -m "Update content"
git push origin main

# GitHub automatically deploys within 1-2 minutes
```

## Option 3: Netlify (Recommended for Simplicity)

Netlify offers the easiest zero-config deployment with custom domains and HTTPS.

### Drag-and-Drop Deployment (Fastest)

1. **Go to [Netlify Drop](https://app.netlify.com/drop)**
2. **Drag and drop your entire project folder** onto the page
3. **Wait for deployment** - usually completes in 10-30 seconds
4. **You get a live URL** - automatically assigned and can be customized

### Permanent Deployment (GitHub Connected)

1. **Sign up for Netlify** at https://netlify.com (free tier available)

2. **Connect your GitHub repository:**
   - Click "New site from Git"
   - Select GitHub
   - Authorize and select your repository

3. **Configure build settings:**
   - Build command: Leave empty (no build needed)
   - Publish directory: `.` (root)
   - Leave other settings default
   - Click "Deploy site"

4. **Netlify automatically deploys:**
   - Every push to `main` branch
   - Preview URLs for pull requests

5. **Connect a custom domain:**
   - Go to Site Settings → Domain Management
   - Add your custom domain
   - Follow DNS configuration instructions
   - Netlify provides free automatic HTTPS

### Updating Content

```bash
# Make changes locally
# Edit HTML files, CSS, etc.

# Commit and push to GitHub
git add .
git commit -m "Update content"
git push origin main

# Netlify automatically redeploys within 1-2 minutes
```

## Option 4: Other Static Hosts

This site can be deployed to any HTTP server that serves static files:

- **Vercel** - `vercel.com` (designed for Next.js but works for static sites)
- **AWS S3 + CloudFront** - scalable for high traffic
- **Cloudflare Pages** - connected to GitHub
- **Firebase Hosting** - Google's static hosting
- **Render** - simplified deployment
- **Any web host** - as long as it serves HTTP/HTTPS and supports directory structure

For any of these, the process is similar:
1. Upload all files preserving directory structure
2. Set the root/publish directory to where your HTML files are
3. Test all pages work correctly

## Validation Checklist (Post-Deployment)

After deploying to production, verify the site works correctly:

### Basic Functionality
- [ ] Home page (`index.html`) loads and displays correctly
- [ ] Calendar page (`calendar.html`) is accessible and interactive
- [ ] Guides page (`guide.html`) displays all guide cards
- [ ] Deep dive guide (`guide-aztec-calendar.html`) loads with all content

### Navigation
- [ ] All navigation links work and go to correct pages
- [ ] Back buttons or breadcrumbs work correctly
- [ ] Mobile menu appears on small screens
- [ ] Mobile menu can be opened and closed
- [ ] Active page is highlighted in navigation

### Content & Styling
- [ ] All text displays in correct fonts (serif for headings, sans-serif for body)
- [ ] Colors display correctly (look for teal/green primary color, orange accents)
- [ ] Images load properly (SVGs visible, favicon in browser tab)
- [ ] Dark mode works if system preference is set to dark

### Interactivity
- [ ] Calendar elements are clickable/interactive
- [ ] Card hover effects work (color changes, shadows)
- [ ] Buttons and links show focus state when using keyboard Tab key
- [ ] Dropdown menus or expandable sections work correctly

### Browser Console & Performance
- [ ] Open browser Developer Tools (F12) → Console tab
- [ ] No red error messages
- [ ] No warnings about missing resources (404 errors)
- [ ] Page loads in under 3 seconds
- [ ] Google Fonts load successfully (check Network tab)

### Keyboard & Accessibility
- [ ] Can navigate entire site using only Tab and Enter keys
- [ ] Focus indicators are visible on all interactive elements
- [ ] Mobile menu can be closed with Escape key
- [ ] Screen reader announces page structure correctly (test with VoiceOver, NVDA, or JAWS)

### Browser Compatibility Check
Test on multiple browsers if possible:
- [ ] Chrome/Chromium 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

### Mobile Testing
- [ ] Site is responsive on phones (iPhone, Android)
- [ ] Site is responsive on tablets
- [ ] Touch interactions work on mobile devices
- [ ] Text is readable without zooming
- [ ] Mobile menu works on touchscreen

## Troubleshooting

### Pages show unstyled text or missing styles

**Cause:** The `assets/css/styles.css` file didn't upload correctly or relative paths are broken.

**Fix:**
1. Verify `assets/css/styles.css` exists on server
2. Check that directory structure is exactly as shown (case-sensitive on Linux servers)
3. Ensure the HTML file's link tag points to `./assets/css/styles.css`
4. Test by checking the Network tab in browser DevTools - should show styles.css loaded

### Fonts look different or display as system fonts

**Cause:** Google Fonts CDN is not loading.

**Fix:**
1. Check your internet connection
2. Verify no adblocker is blocking fonts.googleapis.com
3. Check browser console for CORS errors
4. This is acceptable - fallback system fonts will display

### Mobile menu doesn't work

**Cause:** JavaScript not loading or disabled.

**Fix:**
1. Verify JavaScript is not disabled in browser settings
2. Check that HTML file's `<script>` tags are present
3. Open browser console (F12) and check for JavaScript errors
4. Site functions without JavaScript, but mobile menu won't toggle

### Images not showing (broken SVGs)

**Cause:** Image files didn't upload or paths are incorrect.

**Fix:**
1. Verify all files in `assets/images/` uploaded correctly
2. Check file names are exact (case-sensitive on Linux servers)
3. Verify relative paths in HTML: `./assets/images/filename.svg`

### Page returns 404 error

**Cause:** HTML file not found or uploaded to wrong location.

**Fix:**
1. Verify all `.html` files are in web root directory
2. Check that file names are spelled correctly
3. Ensure files have `.html` extension (not `.htm`)
4. Check web server is configured to serve HTML files

## Performance Tips

- **Keep assets local:** Consider downloading Google Fonts and serving them locally if CDN is slow in your region
- **Use compression:** Most web hosts support gzip compression automatically
- **CDN:** For high traffic, use a CDN like Cloudflare in front of your web server
- **Monitoring:** Set up uptime monitoring to alert if the site goes down

## Version History

This document applies to the **static HTML/CSS/JavaScript version** of this site.

### Legacy: Next.js Deployment

⚠️ **ARCHIVED:** Previous versions of this project required Node.js and Next.js. Those deployment procedures are no longer relevant.
- Old docs with Next.js references: See `docs/deployment.md` (archived)
- If you need legacy documentation, contact the project maintainers

The current static version:
- Requires **no build process**
- Requires **no Node.js or npm**
- Requires **no server runtime**
- Works on any static hosting
- Is production-ready immediately after upload

---

**Last Updated:** 2024
**Version:** Static Bundle v1.0
**Questions?** Check README.md or see docs/ folder for more information.

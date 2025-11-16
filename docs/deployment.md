# Deployment Guide

This guide covers deployment options and procedures for the Educational Platform.

## Pre-Deployment Checklist

Before deploying:

- [ ] All tests pass: `npm run test:run`
- [ ] TypeScript check passes: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors or warnings
- [ ] Environment variables are configured
- [ ] Build succeeds: `npm run build`
- [ ] Manual testing completed
- [ ] Performance is acceptable

## Vercel Deployment (Recommended)

Vercel is the official hosting platform for Next.js and provides seamless integration.

### Prerequisites

- Vercel account (free at https://vercel.com)
- GitHub, GitLab, or Bitbucket account

### Setup

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Add New..." → "Project"
   - Select your repository

2. **Configure Project**
   - Project name: `educational-platform` (or your choice)
   - Framework preset: Next.js (auto-detected)
   - Root directory: `./` (default)

3. **Environment Variables** (if needed)
   - Add any required environment variables
   - Available in deployment settings

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys

### Automatic Deployments

- **Main Branch**: Production deployment
- **Other Branches**: Preview deployments
- **Pull Requests**: Automatic preview URLs

### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Self-Hosted Deployment

For deploying to your own server or cloud infrastructure.

### Build for Production

```bash
# Install dependencies
npm install

# Build application
npm run build

# Start production server
npm start
```

The production server runs on port 3000 by default.

### Using Environment Variables

```bash
# .env.production
NODE_ENV=production
PORT=3000
```

### Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next .next
COPY public public

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and Run:**

```bash
# Build image
docker build -t educational-platform .

# Run container
docker run -p 3000:3000 educational-platform
```

### Nginx Reverse Proxy

**nginx.conf:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL/TLS Certificate

Use Let's Encrypt for free SSL:

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is set up automatically
```

## AWS Deployment

### EC2 Instance

1. **Launch Instance**
   - Select Ubuntu 22.04 LTS
   - Configure security groups
   - Allow ports 80 and 443

2. **Connect and Setup**
   ```bash
   ssh -i key.pem ubuntu@instance-ip
   
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Clone repository
   git clone your-repo.git
   cd educational-platform
   
   # Install and build
   npm install
   npm run build
   ```

3. **Use PM2 for Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "app" -- start
   pm2 startup
   pm2 save
   ```

### AWS Amplify

1. **Connect Repository**
   - Sign into AWS Amplify Console
   - Select "New app" → "Host web app"
   - Connect your Git repository

2. **Configure Build**
   - Build command: `npm run build`
   - Start command: `npm start`

3. **Deploy**
   - Amplify automatically builds and deploys

## Railway Deployment

Railway provides simple deployment for Node.js applications.

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Create new project
   - Select "Deploy from GitHub"

2. **Configure**
   - Add environment variables if needed
   - Railway auto-detects Next.js

3. **Deploy**
   - Commits to main branch auto-deploy
   - Preview deployments for PRs

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npm install -g next-bundle-analyzer

# Check for large dependencies
npm ls --depth=0
```

### Runtime Optimization

- Enable image optimization
- Use Next.js font optimization
- Enable compression (nginx)
- Set appropriate cache headers

### Monitoring

- Set up error tracking (e.g., Sentry)
- Monitor performance metrics
- Track user analytics
- Set up alerts for issues

## Continuous Deployment (CI/CD)

### GitHub Actions

**.github/workflows/deploy.yml:**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:run
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

### GitLab CI/CD

**.gitlab-ci.yml:**

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  image: node:18
  stage: test
  script:
    - npm ci
    - npm run test:run
    - npm run type-check
    - npm run lint

build:
  image: node:18
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next
      - public

deploy:
  image: node:18
  stage: deploy
  script:
    - npm ci
    - npm run build
    - npm start &
  only:
    - main
```

## Monitoring and Maintenance

### Health Checks

```bash
curl -I https://your-domain.com

# Should return 200 OK
```

### Logs

**Vercel:**
- Accessible in Vercel Dashboard
- Real-time logs available

**Self-Hosted:**
```bash
# PM2 logs
pm2 logs app

# Docker logs
docker logs container-id
```

### Updates

- Regularly update dependencies: `npm update`
- Monitor security advisories: `npm audit`
- Test updates in staging first

## Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version compatibility
- Verify all dependencies install
- Check for missing environment variables
- Review build logs for errors

**High Memory Usage**
- Check for memory leaks
- Monitor with `pm2 monit`
- Restart application if needed

**Performance Issues**
- Analyze bundle size
- Check server resources
- Monitor database queries
- Use CDN for static assets

**SSL Certificate Issues**
- Verify certificate is valid
- Check domain DNS settings
- Renew certificate if expired
- Check Nginx configuration

## Rollback Procedures

### Vercel

```bash
# Go to Deployments tab
# Click "Promote to Production" on previous version
```

### Self-Hosted with PM2

```bash
# Restart application
pm2 restart app

# Or rollback code
git checkout previous-commit-hash
npm run build
pm2 restart app
```

## Scaling

### Horizontal Scaling

- Use load balancer (Nginx, HAProxy)
- Run multiple application instances
- Use PM2 cluster mode:

```bash
pm2 start npm -i max --name "app" -- start
```

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize application code
- Use caching strategies

---

For more information, see:
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [docs/architecture.md](./architecture.md)
- [docs/accessibility.md](./accessibility.md)

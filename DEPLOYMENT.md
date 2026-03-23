# 🚀 Deployment Guide

## 📋 Deployment Options

### 1. 🏠 Local Development
See [QUICK_START.md](./QUICK_START.md) for local setup.

### 2. 🐳 Docker Deployment

#### Dockerfile for Frontend
```dockerfile
# lms/frontend/Dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Dockerfile for Backend
```dockerfile
# lms/backend/Dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./lms/frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./lms/backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - PORT=5000
    volumes:
      - ./data:/app/data
```

### 3. ☁️ Cloud Deployment

#### Heroku Deployment
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-e-learning-app

# Add buildpacks
heroku buildpacks:add heroku/nodejs

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_secret

# Deploy
git push heroku main
```

#### Vercel Deployment (Frontend Only)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify Deployment (Frontend Only)
```bash
# Build frontend
cd lms/frontend
npm run build

# Deploy to Netlify
# Upload build folder to Netlify
```

### 4. 🖥️ VPS Deployment

#### Prerequisites
- Ubuntu 20.04+ / CentOS 8+
- Node.js 14+
- Nginx
- SSL Certificate

#### Setup Steps

1. **Server Setup:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

2. **Application Setup:**
```bash
# Clone repository
git clone https://github.com/Ajit123540/E-learning-.git
cd E-learning-

# Install dependencies
npm run install-all

# Build frontend
npm run build
```

3. **Environment Configuration:**
```bash
# Create production environment
sudo nano lms/backend/.env
```

4. **PM2 Configuration:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'e-learning-backend',
    script: './lms/backend/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

5. **Start Application:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

6. **Nginx Configuration:**
```nginx
# /etc/nginx/sites-available/e-learning
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/E-learning-/lms/frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **SSL Setup:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

### 5. 🔧 Production Configuration

#### Environment Variables
```env
# Production .env
NODE_ENV=production
PORT=5000
JWT_SECRET=your_super_secure_production_jwt_secret
CORS_ORIGIN=https://your-domain.com
```

#### Nginx Production Config
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;

    # Frontend
    location / {
        root /path/to/E-learning-/lms/frontend/build;
        try_files $uri $uri/ /index.html;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### 6. 📊 Monitoring & Logging

#### PM2 Monitoring
```bash
# Monitor application
pm2 monit

# View logs
pm2 logs

# Restart application
pm2 restart e-learning-backend
```

#### Log Rotation
```bash
# Install logrotate
sudo apt install logrotate

# Create logrotate config
sudo nano /etc/logrotate.d/e-learning
```

```
/var/log/e-learning/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 7. 🔒 Security Best Practices

1. **Environment Security:**
   - Use strong JWT secrets
   - Rotate secrets regularly
   - Don't commit .env files

2. **Server Security:**
   - Keep system updated
   - Use firewall
   - Disable root login
   - Use SSH keys

3. **Application Security:**
   - Enable CORS properly
   - Validate all inputs
   - Use HTTPS
   - Implement rate limiting

### 8. 🚀 Performance Optimization

1. **Frontend Optimization:**
   - Enable code splitting
   - Optimize images
   - Use CDN
   - Enable caching

2. **Backend Optimization:**
   - Use clustering
   - Implement caching
   - Optimize database queries
   - Use compression

3. **Database Optimization:**
   - Add indexes
   - Use connection pooling
   - Monitor performance
   - Regular backups

### 9. 🔄 CI/CD Pipeline

#### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: npm run install-all
      
    - name: Build frontend
      run: npm run build
      
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.4
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /path/to/E-learning-
          git pull origin main
          npm run build
          pm2 restart e-learning-backend
```

### 10. 📱 Mobile App Deployment

#### React Native Setup
```bash
# Install React Native CLI
npm install -g react-native-cli

# Create mobile app
npx react-native init ELearningMobile

# Add to existing project
npx react-native init ELearningMobile --template react-native-template-typescript
```

---

**For production deployment, ensure you:**
1. Use environment variables for sensitive data
2. Enable HTTPS
3. Set up monitoring
4. Configure backups
5. Test thoroughly

**Need help?** Check our [GitHub Issues](https://github.com/Ajit123540/E-learning-/issues) or [Discussions](https://github.com/Ajit123540/E-learning-/discussions).

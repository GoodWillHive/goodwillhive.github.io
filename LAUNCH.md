# GoodWillHive — Launch Checklist

## What's built
- index.html — landing page (EN/VI, AI coin counter, 4 article cards)
- articles/save-tokens.html — first full article (EN + VI)
- style.css — dark theme, responsive
- coin.js — global AI coin counter (countapi.xyz free API, localStorage fallback)
- llms.txt — AI agent entry point
- api/index.json — machine-readable article index
- robots.txt

## Articles listed but not yet written (placeholders)
- articles/context-window.html
- articles/ai-workflow.html
- articles/prompt-patterns.html

## Steps to launch (15 min)

### 1. Create GitHub repo
- Go to github.com, logged in as GoodWillHive org
- New repo named: `goodwillhive.github.io`
- Public, no README (we'll push our own files)

### 2. Push files
```
cd "C:\Users\babui\Claude\Projects\GoodWillHive"
git init
git add .
git commit -m "feat: initial launch — landing page + first article"
git remote add origin https://github.com/GoodWillHive/goodwillhive.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Repo Settings → Pages → Source: Deploy from branch → main → / (root)
- Wait ~1 min → site live at: https://goodwillhive.github.io

### 4. Set up GA4 (visit tracking — the main data)
- Go to analytics.google.com (use ba.buiminhanh@gmail.com)
- Create Account: "GoodWillHive"
- Create Property: "goodwillhive.github.io"
- Get Measurement ID: looks like G-XXXXXXXXXX
- In index.html and articles/*.html: uncomment the GA4 block, replace G-XXXXXXXXXX
- Push again

### 5. Register coin counter (one-time)
- Visit in browser: https://api.countapi.xyz/create?namespace=goodwillhive&key=ai-coins&value=0
- This initializes the counter. Skip if already initialized.

## What to do after launch
- Write the 3 remaining articles (Will can draft them)
- Share on LinkedIn / Twitter / any AI community
- Post the AI coin joke — that's the hook that drives traffic
- Check GA4 weekly for: top pages, traffic sources, country breakdown

## Monetization (when traffic > 500 visitors/month)
- Add sponsor slot on homepage (AI tool companies)
- Or: paid Notion template / prompt pack as product

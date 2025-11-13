# 🚀 GitHub Pages Deployment Guide

Quick guide to get your Double Secret Santa app live on GitHub Pages in minutes!

## 📦 What You Have

Your app consists of these files:
- `index.html` - Participant reveal page (main page)
- `setup.html` - Organizer setup page
- `styles.css` - Beautiful styling
- `setup.js` - Setup logic
- `reveal.js` - Reveal logic
- `README.md` - Documentation

## 🎯 Deployment Steps

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon (top-right) → **New repository**
3. Name it (e.g., `secret-santa-2024`)
4. Set to **Public** (required for free GitHub Pages)
5. **Don't** initialize with README (we already have files)
6. Click **Create repository**

### Step 2: Generate Secret Santa Data

**IMPORTANT:** Do this BEFORE pushing to GitHub!

1. Open `setup.html` locally (see LOCAL_SETUP.md)
2. Add all participant names
3. Click "Generate Secret Santa"
4. Click **"📥 Download Data File"** button
5. Save the file as `data.json` in your project folder
6. Click **"📥 Download Codes"** to save the secret codes

### Step 3: Push Your Code

In your terminal, navigate to this project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files (including data.json)
git add .

# Commit
git commit -m "Initial commit - Double Secret Santa app"

# Add your repository as remote (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace** `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name.

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab near the top)
3. Scroll down and click **Pages** (left sidebar)
4. Under **Source**:
   - Select branch: **main**
   - Select folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes for deployment

### Step 5: Access Your App

Your app will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

**Pages:**
- Main (reveal) page: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
- Setup page: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/setup.html`

## 🔐 How Persistence Works on GitHub Pages

### The Magic: `data.json` File

Unlike typical web apps that need a database, this app uses a clever approach:

1. **One-Time Setup**: You generate the Secret Santa locally
2. **Download Data**: The app creates an encrypted `data.json` file
3. **Commit to Repo**: You add this file to your GitHub repository
4. **Universal Access**: Everyone can access the same data from the file

### Why This Works:

- ✅ **No Database Needed**: Data is stored as a static file
- ✅ **Privacy Protected**: Data is encrypted, only codes can decrypt
- ✅ **GitHub Pages Compatible**: Static file hosting works perfectly
- ✅ **No Snooping**: Without a code, assignments can't be decrypted
- ✅ **Persistent**: Data stays in the repo forever

### Security Model:

```
Encrypted Data (data.json)
       ↓
Everyone downloads this
       ↓
Only YOUR secret code can decrypt YOUR assignment
       ↓
No one else can see who you're buying for
```

## 🎨 Using the Deployed App

### As Organizer:

You already did the setup in Step 2! Now just:
1. Share the main URL with participants
2. Give each person their secret code (privately!)

### As Participant:

1. Visit: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
2. Enter your name and secret code
3. View your assignment
4. Keep it secret! 🤫

## 🔧 Troubleshooting

### "Repository not found" error
- Make sure your repository is **Public**
- Check the remote URL: `git remote -v`

### GitHub Pages not working
- Wait a few minutes after enabling Pages
- Check the Actions tab for build status
- Ensure your repository is public

### Need to reset the Secret Santa
- The setup locks after first use (by design)
- To reset: Participants need to clear browser localStorage
- Or use a different browser/incognito mode for testing

## 🔄 Updating Your App

Made changes? Push updates:

```bash
git add .
git commit -m "Update Secret Santa app"
git push
```

GitHub Pages will auto-update in 1-2 minutes.

## 🎁 Tips

- ✅ **Test First**: Use incognito mode to test before the real event
- ✅ **Share the Main URL**: Give participants `index.html` (the root URL)
- ✅ **Keep Setup Private**: Don't share `setup.html` URL with participants
- ✅ **One Setup**: Remember, setup can only be done once per deployment

## 🆘 Need Help?

- Check repository Settings → Pages for deployment status
- Look at the Actions tab for build logs
- Make sure all files are pushed: `git status`

---

**That's it!** Your Double Secret Santa app is now live and ready to spread holiday cheer! 🎄✨


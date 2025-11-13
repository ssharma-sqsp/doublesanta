# 🚀 Quick Start Guide

Get your Double Secret Santa running in minutes!

## 📋 For Organizers

### Step 1: Test Locally First (Recommended)

```bash
# In your project folder
python3 -m http.server 8080
```

Open http://localhost:8080/setup.html

### Step 2: Create the Event

1. Add all participant names (min 4, must be even)
2. Click **"Generate Secret Santa"**
3. Click **"📥 Download Codes"** - Save this for distributing
4. Click **"📥 Download Data File"** - Save as `data.json` in project folder

### Step 3: Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Double Secret Santa setup"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Enable GitHub Pages in repo Settings → Pages → Source: main

### Step 4: Share with Participants

1. Share the URL: `https://USERNAME.github.io/REPO/`
2. Give each person their secret code **privately**

Done! 🎉

---

## 🎁 For Participants

### Access Your Assignment

1. Go to the URL the organizer shared
2. Enter your name (exactly as organizer spelled it)
3. Enter your secret code
4. Click **"🎅 Reveal My Assignment"**
5. See your duo partner and who you're buying for!

### Keep It Secret!

- ❌ Don't share your assignment
- ❌ Don't tell anyone who you're buying for
- ✅ Save your code - you can check anytime
- ✅ Have fun shopping! 🎁

---

## 🔧 Troubleshooting

### "Need even number of participants"
→ Add or remove one person

### "Invalid secret code"
→ Check for typos (codes are UPPERCASE)

### "Name doesn't match code"
→ Enter your name exactly as organizer spelled it

### "Not set up yet"
→ Organizer hasn't deployed `data.json` yet

### "Can't generate new exchange" / "Already Setup"
→ By design! Open **manage.html** to reset or export data

---

## 📚 More Help

- **Running Locally**: See `LOCAL_SETUP.md`
- **Deploying**: See `DEPLOYMENT.md`
- **How It Works**: See `PERSISTENCE_EXPLAINED.md`
- **Full Docs**: See `README.md`

---

Happy Secret Santa! 🎅✨


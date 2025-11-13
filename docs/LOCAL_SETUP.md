# 💻 Running Double Secret Santa Locally

You can easily run this app on your local machine without deploying to GitHub Pages!

## 🚀 Quick Start (Easiest Method)

### Option 1: Direct File Opening

Simply open the HTML files directly in your browser:

1. **For Participants**: Double-click `index.html` or drag it into your browser
2. **For Setup**: Double-click `setup.html` or drag it into your browser

**That's it!** The app will work perfectly since it's 100% client-side.

---

## 🌐 Better Method: Using a Local Web Server

While the direct method works, using a local server provides a better experience and more accurate testing.

### Option A: Python (Built-in on Mac/Linux)

If you have Python installed:

```bash
# Navigate to the project folder
cd /Users/ssharma/Scripts/adhoc/work/doublesanta

# Python 3 (most common)
python3 -m http.server 8000

# OR Python 2 (older systems)
python -m SimpleHTTPServer 8000
```

Then open in your browser:
- Main page: `http://localhost:8000/`
- Setup page: `http://localhost:8000/setup.html`

### Option B: Node.js (http-server)

If you have Node.js installed:

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to project folder
cd /Users/ssharma/Scripts/adhoc/work/doublesanta

# Start server
http-server -p 8000
```

Then open: `http://localhost:8000/`

### Option C: PHP (If installed)

```bash
cd /Users/ssharma/Scripts/adhoc/work/doublesanta
php -S localhost:8000
```

Then open: `http://localhost:8000/`

### Option D: VS Code Live Server

If you use Visual Studio Code:

1. Install "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

---

## 🎯 Using the Local App

### As Organizer:

1. Open `setup.html` in your browser
2. Add participant names (minimum 4, even number)
3. Click "Generate Secret Santa"
4. **Download/save the codes** - they're only shown once!
5. Share codes privately with each participant

### As Participant:

1. Open `index.html` in your browser
2. Enter your name + secret code
3. View your assignment
4. Keep it secret!

---

## 💾 Data Storage

The app uses **browser localStorage**, which means:

- ✅ Data persists between sessions (even if you close the browser)
- ✅ Each browser has its own storage (Chrome, Firefox, Safari are separate)
- ✅ Each profile/user has its own storage
- ⚠️ Clearing browser data will erase the setup
- ⚠️ Incognito/Private mode data is cleared when you close the window

---

## 🔄 Testing & Resetting

### Test in Incognito Mode

To test without affecting your main setup:

- **Chrome/Edge**: Ctrl+Shift+N (Cmd+Shift+N on Mac)
- **Firefox**: Ctrl+Shift+P (Cmd+Shift+P on Mac)
- **Safari**: Cmd+Shift+N

Open the app in incognito mode, and your test data won't interfere with the real setup.

### Reset for a New Event

To clear the setup and start over:

**Method 1: Browser DevTools**
1. Open DevTools: F12 (or Cmd+Option+I on Mac)
2. Go to "Application" tab (Chrome/Edge) or "Storage" tab (Firefox)
3. Find "Local Storage" → `file://` or `http://localhost:8000`
4. Delete these keys:
   - `secretSantaSetup`
   - `secretSantaData`
5. Refresh the page

**Method 2: Different Browser**
Use a completely different browser for each event or testing.

**Method 3: Different Browser Profile**
Create a new browser profile for each event.

---

## 🎨 Development Tips

### Edit and Test

1. Make changes to any file
2. Save the file
3. Refresh your browser (F5 or Cmd+R)
4. See changes immediately!

### Files You Can Edit:

- **`styles.css`**: Change colors, fonts, layout
- **`setup.js`**: Modify pairing logic
- **`reveal.js`**: Adjust reveal behavior
- **`index.html`**: Update participant interface
- **`setup.html`**: Update organizer interface

---

## 🐛 Troubleshooting Local Setup

### "File not found" errors
- Make sure all files are in the same folder
- Check file names match exactly (case-sensitive on some systems)

### Data not persisting
- Don't use Incognito mode for real setup
- Check that localStorage isn't disabled in browser settings

### Setup says "Already Setup" but you haven't set it up
- You or someone else ran setup before
- Clear localStorage (see "Reset" section above)

### Works locally but not when shared with others
- Local setup only works on YOUR computer
- To share with others, deploy to GitHub Pages (see DEPLOYMENT.md)
- Each person's browser has separate localStorage

---

## 📱 Testing on Mobile (Local Network)

Want to test on your phone while running locally?

1. Start a local server (Python, Node, etc.) on your computer
2. Find your computer's local IP address:
   - **Mac/Linux**: Run `ifconfig | grep inet`
   - **Windows**: Run `ipconfig`
   - Look for something like `192.168.1.x`
3. On your phone, open browser and go to:
   ```
   http://YOUR-IP-ADDRESS:8000/
   ```
   For example: `http://192.168.1.100:8000/`

**Note**: Your phone must be on the same WiFi network as your computer.

---

## 🎁 Ready to Share?

When you're done testing locally and ready to share with your group:
- See **DEPLOYMENT.md** for GitHub Pages instructions
- Once deployed, everyone can access it via a URL
- No need for everyone to run it locally!

---

Happy local testing! 🎄✨


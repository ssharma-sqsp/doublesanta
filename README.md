# 🎅 Double Secret Santa

A beautiful, secure web app for organizing a Double Secret Santa gift exchange where participants are randomly paired into duos, and each duo buys gifts for another duo.

## ✨ Features

- 🎲 **Random Duo Pairing**: Automatically pairs participants into duos
- 🎁 **Secret Assignments**: Each duo is assigned to buy gifts for a different duo
- 🔒 **Privacy First**: Secret codes ensure no one can snoop on others' assignments
- 🔐 **One-Time Setup**: Organizer sets up once, assignments are permanently locked
- 💾 **Persistent Storage**: Everyone can return anytime to check their assignment
- 📱 **Responsive Design**: Beautiful modern UI that works on all devices
- 🚀 **GitHub Pages Ready**: Host for free with no backend required

## 🚀 Quick Start

### For Organizers

1. **Open the Setup Page**: Navigate to `setup.html`
2. **Add Participants**: Enter names of all participants (minimum 4, must be even number)
3. **Generate Pairings**: Click "Generate Secret Santa" button
4. **Distribute Codes**: Each participant gets a unique secret code - share these privately
5. **Save the Codes**: Download or save the codes list (you won't see them all together again!)

### For Participants

1. **Open the Reveal Page**: Navigate to `index.html`
2. **Enter Your Info**: Type your name and the secret code you received
3. **View Assignment**: See your duo partner and who you're buying gifts for
4. **Keep It Secret**: Don't share your assignment with anyone!

### For Managing/Resetting

1. **Open the Management Page**: Navigate to `manage.html`
2. **Export Data**: Download data.json or codes backup
3. **Import Data**: Load existing data.json from another browser
4. **Reset Setup**: Clear everything to create a new exchange

## 📋 How It Works

### The Pairing Process

1. All participants are randomly shuffled
2. Participants are paired into duos (2 people per duo)
3. Each duo is assigned to buy gifts for a different duo
4. No duo can be assigned to themselves
5. Each person gets a unique 6-character secret code

### Example

With 6 participants: Alice, Bob, Carol, Dave, Eve, Frank

```
Duos formed:
- Duo 1: Alice & Bob
- Duo 2: Carol & Dave
- Duo 3: Eve & Frank

Assignments (example):
- Alice & Bob → Buy for Carol & Dave
- Carol & Dave → Buy for Eve & Frank
- Eve & Frank → Buy for Alice & Bob
```

## 🔐 Security & Privacy

- **Secret Codes**: Each participant gets a unique code to access their assignment
- **Data Encryption**: All data is encrypted using XOR cipher before storage
- **Local Storage**: Data stored in browser's localStorage (no server, no database)
- **No Snooping**: Without the code, assignments cannot be accessed
- **One-Time Setup**: Once generated, pairings cannot be changed or regenerated

## 🌐 Deploying to GitHub Pages

### Method 1: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Upload all files:
   - `index.html`
   - `setup.html`
   - `styles.css`
   - `setup.js`
   - `reveal.js`
   - `README.md`
3. Go to repository Settings
4. Navigate to "Pages" section
5. Under "Source", select "main" branch
6. Click "Save"
7. Your site will be available at: `https://[username].github.io/[repository-name]/`

### Method 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Double Secret Santa app"

# Add remote repository
git remote add origin https://github.com/[username]/[repository-name].git

# Push to GitHub
git push -u origin main
```

Then enable GitHub Pages in repository settings as described above.

## 📱 Usage Tips

### For Organizers

- ✅ **Test First**: Try with a small test group before the real event
- ✅ **Even Numbers**: Make sure you have an even number of participants
- ✅ **Save Codes**: Download the codes file immediately after generating
- ✅ **Private Distribution**: Send each person their code privately (email, text, etc.)
- ⚠️ **One Chance**: Setup can only be done once - double-check your participant list!
- ⚠️ **Clear Browser**: If you need to start over, clear your browser's localStorage

### For Participants

- ✅ **Save Your Code**: Write down your secret code in a safe place
- ✅ **Check Anytime**: You can return to the reveal page whenever needed
- ✅ **Keep Secret**: Don't share your assignment or who you're buying for
- ⚠️ **Exact Name**: Enter your name exactly as the organizer spelled it

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Web Storage API**: localStorage for persistent data
- **Base64 Encoding**: Data obfuscation

### Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

### File Structure

```
doublesanta/
├── index.html              # Main reveal page for participants
├── setup.html              # Setup page for organizers
├── manage.html             # Management page (export/reset)
├── export-data.html        # Extract data from localStorage
├── styles.css              # Beautiful modern styling
├── setup.js                # Setup logic and pairing algorithm
├── reveal.js               # Reveal logic and code validation
├── data.json               # (Generated) Encrypted data for deployment
└── README.md               # This file
```

## 🔄 Starting Over

If you need to reset and start over (during testing or for a new event):

### Option 1: Use Management Page (Easiest!)

1. Open `manage.html`
2. Click "🗑️ Reset Everything"
3. Confirm the prompts
4. Create a new Secret Santa exchange

### Option 2: Clear Browser Storage

1. Open browser DevTools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Find "Local Storage"
4. Delete `secretSantaSetup` and `secretSantaData`
5. Refresh the page

### Option 3: Use Private/Incognito Window

Open the setup page in a private browsing window to test without affecting your main storage.

### Option 4: Use Different Browser

Use a different browser for testing vs. production setup.

## 🎨 Customization

Want to customize the look? Edit `styles.css`:

- **Colors**: Modify CSS variables in `:root`
- **Fonts**: Change `font-family` in `body`
- **Animations**: Adjust `@keyframes` sections
- **Layout**: Modify `.container` max-width

## ❓ Troubleshooting

### "Need an even number of participants"
- **Problem**: You have an odd number of people
- **Solution**: Add or remove one person to make an even number

### "Invalid secret code"
- **Problem**: Code doesn't match any assignment
- **Solution**: Double-check the code for typos (case-sensitive)

### "Secret Santa Already Setup"
- **Problem**: Trying to run setup again
- **Solution**: This is intentional - setup is one-time only. Clear storage to reset.

### "Failed to decrypt data"
- **Problem**: Data corruption or browser storage cleared
- **Solution**: Organizer needs to run setup again

## 📝 License

This project is open source and free to use for personal and commercial purposes.

## 🎄 Happy Holidays!

May your Secret Santa exchange be full of joy, surprises, and wonderful gifts! 🎁

---

Made with ❤️ for spreading holiday cheer

# 🔐 How Data Persistence Works

A deep dive into how the Double Secret Santa app handles data storage and privacy.

## 🤔 The Challenge

When building a Secret Santa app for GitHub Pages (static hosting), we face a unique challenge:

- ❌ **No Backend Server**: Can't use a traditional database
- ❌ **No User Authentication**: No login system
- ✅ **Must Be Private**: No one should see others' assignments
- ✅ **Must Be Persistent**: Data should work across all devices
- ✅ **Must Be Secure**: Secret codes protect privacy

## 💡 The Solution: Hybrid Approach

### Local Testing (localStorage)

When you run the app locally:

```
1. Setup creates data → Stored in browser's localStorage
2. Reveal page reads from localStorage
3. Data persists on YOUR computer only
4. Perfect for testing!
```

**Limitation**: Only works on your browser. Others can't access it.

### Production Deployment (data.json)

When deployed to GitHub Pages:

```
1. Setup creates data → Download as data.json
2. Commit data.json to your repository
3. GitHub Pages serves it as a static file
4. Everyone fetches the same encrypted data
5. Secret codes decrypt individual assignments
```

**Benefits**: 
- ✅ Works for everyone
- ✅ No backend needed
- ✅ Privacy maintained through encryption

## 🔒 Security Architecture

### Three Layers of Protection

#### Layer 1: Encryption
```javascript
// Data is encrypted with XOR cipher before storage
const encrypted = encryptData(secretData);
// Result: Unreadable gibberish without decryption
```

#### Layer 2: Secret Codes
```javascript
// Each participant has a unique 6-character code
// Code acts as the key to their specific assignment
data[code] = {
    name: "Alice",
    partner: "Bob",
    targetDuo: ["Carol", "Dave"]
};
```

#### Layer 3: Name Verification
```javascript
// Even with a code, you must know the correct name
if (assignment.name !== enteredName) {
    // Access denied
}
```

### What Can Someone See?

**Without any code:**
- They can download `data.json`
- They see encrypted text: `"ImRhdGEiOiJceGYwXHgyMVx..."`
- Completely unreadable ❌

**With someone else's code:**
- They can decrypt the data
- But their entered name won't match
- Access denied ❌

**With their own code + name:**
- They decrypt successfully
- Name verification passes
- They see ONLY their assignment ✅

## 📊 Data Flow Diagram

### Setup Phase

```
Organizer
    ↓
Opens setup.html locally
    ↓
Adds participant names
    ↓
Generates random pairings
    ↓
Creates secret codes
    ↓
Encrypts all data
    ↓
Downloads data.json + codes.txt
    ↓
Commits data.json to GitHub
    ↓
Distributes codes privately
```

### Reveal Phase

```
Participant
    ↓
Opens deployed index.html
    ↓
JavaScript fetches data.json
    ↓
Participant enters name + code
    ↓
App decrypts data
    ↓
Validates code exists
    ↓
Validates name matches
    ↓
Shows ONLY their assignment
```

## 🆚 Local vs Deployed

| Feature | Local (localStorage) | Deployed (data.json) |
|---------|---------------------|---------------------|
| **Storage** | Browser's localStorage | GitHub repository |
| **Access** | Single browser only | Anyone with URL |
| **Persistence** | Until browser cleared | Forever in repo |
| **Best For** | Testing | Production |
| **Setup Required** | None | Must commit file |

## 🔄 The Dual Mode System

The app automatically detects which mode to use:

```javascript
async function loadData() {
    // Try GitHub Pages mode first
    try {
        const response = await fetch('data.json');
        if (response.ok) {
            // Found it! Use this data
            return await response.json();
        }
    } catch (error) {
        // File doesn't exist
    }
    
    // Fallback to local mode
    const localData = localStorage.getItem('secretSantaData');
    if (localData) {
        return localData;
    }
    
    // No data found anywhere
    showNotSetupYet();
}
```

**Benefits:**
- ✅ Works locally for testing (no data.json needed)
- ✅ Works deployed (reads from data.json)
- ✅ Seamless switching between modes
- ✅ No configuration needed

## 🛡️ Privacy Guarantees

### What the Organizer Can See:
- ✅ All participant names (they added them)
- ✅ All secret codes (generated during setup)
- ✅ All assignments (shown immediately after generation)
- ⚠️ After closing setup page: Can only see their own assignment

### What Participants Can See:
- ✅ Their own duo partner
- ✅ Their target duo (who they buy for)
- ❌ Other people's assignments (encrypted)
- ❌ The pairing algorithm results (only theirs)

### What Someone Snooping Can See:
- ❌ Nothing! Data is encrypted
- ❌ Even with data.json, it's unreadable
- ❌ Would need both code AND name to access anything

## 🎯 Why This Design?

### Alternative Approaches (Not Used)

❌ **Plain Text Data File**
- Problem: Anyone could read all assignments
- Security: None

❌ **Server + Database**
- Problem: Costs money, needs backend
- GitHub Pages: Can't host this

❌ **Each Person Gets Own File**
- Problem: Organizer must create files for everyone
- Complexity: Too complicated

✅ **Current: Encrypted Shared File**
- Pros: Secure, simple, free, no backend
- Cons: Organizer must distribute codes manually

## 🚀 Why It's Perfect for GitHub Pages

GitHub Pages is a **static file host**. It can only serve files, no logic.

Our design works perfectly because:

1. **`data.json` is just a file** → GitHub Pages serves it
2. **All logic is client-side** → JavaScript in browser
3. **No server needed** → Free hosting!
4. **Privacy via encryption** → Not via server access control
5. **Scalable** → Works for 4 people or 400 people

## 📝 Summary

**Local Development:**
```
Setup → localStorage → Reveal (same browser)
```

**Production (GitHub Pages):**
```
Setup → data.json → Git → GitHub → All browsers
```

**Security:**
```
Encryption + Secret Codes + Name Verification = Privacy
```

**Result:**
A completely free, serverless, secure Secret Santa app that works beautifully on GitHub Pages! 🎅✨

---

Questions? Check out:
- `README.md` - Main documentation
- `LOCAL_SETUP.md` - Running locally
- `DEPLOYMENT.md` - Deploying to GitHub Pages


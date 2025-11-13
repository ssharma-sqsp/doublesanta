// Double Secret Santa - Setup Logic

let participants = [];

// Initialize on page load
window.addEventListener('DOMContentLoaded', async () => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // For local: Only check localStorage (so reset works)
    if (isLocal) {
        if (localStorage.getItem('secretSantaSetup')) {
            showAlreadySetupMessage();
            return;
        }
    } else {
        // For deployed: Check both localStorage and GitHub
        if (localStorage.getItem('secretSantaSetup')) {
            showAlreadySetupMessage();
            return;
        }
        
        const dataExists = await checkIfDataExists();
        if (dataExists) {
            showAlreadySetupMessage();
            return;
        }
    }
    
    // Allow Enter key to add participant
    document.getElementById('participantInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addParticipant();
        }
    });
});

async function checkIfDataExists() {
    // Check GitHub Pages first (production source of truth)
    const GITHUB_DATA_URL = window.DOUBLESANTA_CONFIG?.DATA_URL || 'https://ssharma-sqsp.github.io/doublesanta/data.json';
    
    try {
        const response = await fetch(GITHUB_DATA_URL, {
            cache: 'no-cache'
        });
        if (response.ok) {
            console.log('✅ Setup blocked: data.json exists on GitHub Pages');
            return true;
        }
    } catch (error) {
        // GitHub not reachable, check locally
    }
    
    // Fallback: Check local file
    try {
        const response = await fetch('data.json');
        if (response.ok) {
            console.log('✅ Setup blocked: data.json exists locally');
            return true;
        }
    } catch (error) {
        // No data.json found
    }
    
    return false;
}

function addParticipant() {
    const input = document.getElementById('participantInput');
    const name = input.value.trim();
    
    if (!name) {
        showError('Please enter a name');
        return;
    }
    
    // Check for duplicates
    if (participants.some(p => p.toLowerCase() === name.toLowerCase())) {
        showError('This person is already added');
        return;
    }
    
    participants.push(name);
    input.value = '';
    updateParticipantsList();
    updateGenerateButton();
}

function removeParticipant(name) {
    participants = participants.filter(p => p !== name);
    updateParticipantsList();
    updateGenerateButton();
}

function updateParticipantsList() {
    const list = document.getElementById('participantsList');
    
    if (participants.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #718096;">No participants added yet</p>';
        return;
    }
    
    list.innerHTML = participants.map(name => `
        <div class="participant-item">
            <span class="participant-name">${escapeHtml(name)}</span>
            <button class="remove-btn" onclick="removeParticipant('${escapeHtml(name)}')">Remove</button>
        </div>
    `).join('');
}

function updateGenerateButton() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = participants.length < 4;
    
    if (participants.length < 4) {
        btn.textContent = `Add ${4 - participants.length} more (need 4 minimum) 🎁`;
    } else {
        btn.textContent = `Generate Double Santa (${participants.length} people) 🎁`;
    }
}

function generatePairings() {
    if (participants.length < 4) {
        showError('Need at least 4 participants');
        return;
    }
    
    if (participants.length % 2 !== 0) {
        showError('Need an even number of participants to form duos');
        return;
    }
    
    // Confirm one-time setup
    if (!confirm('⚠️ This will permanently create the Double Santa pairings. This cannot be undone or regenerated. Continue?')) {
        return;
    }
    
    try {
        // Shuffle participants
        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        
        // Create duos
        const duos = [];
        for (let i = 0; i < shuffled.length; i += 2) {
            duos.push({
                id: i / 2,
                members: [shuffled[i], shuffled[i + 1]]
            });
        }
        
        // Assign each duo to another duo (derangement)
        const assignments = createDerangement(duos);
        
        // Generate secret codes for each participant
        const secretData = {};
        duos.forEach((duo, duoIndex) => {
            const targetDuo = assignments[duoIndex];
            
            duo.members.forEach(member => {
                const code = generateSecretCode();
                const partner = duo.members.find(m => m !== member);
                
                secretData[code] = {
                    name: member,
                    partner: partner,
                    targetDuo: targetDuo.members
                };
            });
        });
        
        // Encrypt and store data
        const encrypted = encryptData(secretData);
        localStorage.setItem('secretSantaData', encrypted);
        localStorage.setItem('secretSantaSetup', 'true');
        
        // Store the encrypted data for GitHub Pages deployment
        window.generatedData = encrypted;
        
        // Display results
        displayResults(secretData);
        
    } catch (error) {
        showError('Failed to generate pairings. Please try again.');
        console.error(error);
    }
}

function createDerangement(duos) {
    // Create assignments where no duo gets themselves
    const assignments = [];
    let attempts = 0;
    const maxAttempts = 1000;
    
    while (attempts < maxAttempts) {
        const shuffled = [...duos].sort(() => Math.random() - 0.5);
        let valid = true;
        
        // Check if any duo got themselves
        for (let i = 0; i < duos.length; i++) {
            if (duos[i].id === shuffled[i].id) {
                valid = false;
                break;
            }
        }
        
        if (valid) {
            return shuffled;
        }
        
        attempts++;
    }
    
    // Fallback: manual swap if random fails
    const result = [...duos];
    // Rotate by 1
    const first = result.shift();
    result.push(first);
    return result;
}

function generateSecretCode() {
    // Generate a random 6-character alphanumeric code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded similar chars
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
}

function encryptData(data) {
    // Simple XOR encryption with a key based on timestamp
    // For client-side only app, this provides basic obfuscation
    const json = JSON.stringify(data);
    const key = 'SECRETSANTA2024'; // Fixed key for consistency
    let encrypted = '';
    
    for (let i = 0; i < json.length; i++) {
        encrypted += String.fromCharCode(
            json.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    
    return btoa(encrypted); // Base64 encode
}

function displayResults(secretData) {
    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    const codesList = document.getElementById('codesList');
    
    // Randomize the order for security
    const entries = Object.entries(secretData);
    shuffleArray(entries);
    
    const codesHTML = entries.map(([code, data]) => `
        <div class="code-item">
            <div class="code-item-name">${escapeHtml(data.name)}</div>
            <div class="code-item-code">${code}</div>
        </div>
    `).join('');
    
    codesList.innerHTML = codesHTML;
}

function downloadCodes() {
    const data = decryptData(localStorage.getItem('secretSantaData'));
    let text = '🎅 Double Santa - Secret Codes 🎁\n\n';
    text += '⚠️ KEEP THESE CODES PRIVATE ⚠️\n';
    text += 'Give each person their own code only!\n\n';
    text += '=' .repeat(50) + '\n\n';
    
    // Randomize the order of codes for security
    const entries = Object.entries(data);
    shuffleArray(entries);
    
    entries.forEach(([code, info]) => {
        text += `${info.name}\n`;
        text += `Secret Code: ${code}\n`;
        text += '-'.repeat(30) + '\n\n';
    });
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'secret-santa-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function downloadDataFile() {
    // Download the encrypted data file for GitHub Pages deployment
    const encrypted = window.generatedData || localStorage.getItem('secretSantaData');
    const dataObj = { data: encrypted, version: 1 };
    const json = JSON.stringify(dataObj, null, 2);
    
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
}

function decryptData(encrypted) {
    try {
        const decoded = atob(encrypted);
        const key = 'SECRETSANTA2024';
        let decrypted = '';
        
        for (let i = 0; i < decoded.length; i++) {
            decrypted += String.fromCharCode(
                decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        
        return JSON.parse(decrypted);
    } catch (error) {
        throw new Error('Failed to decrypt data');
    }
}

function showAlreadySetupMessage() {
    // Check if we're online (GitHub Pages) or local
    const isOnline = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    const message = isOnline ? `
        <div class="warning-box">
            <h3>🔒 Double Santa Already Deployed</h3>
            <p>This Double Santa has already been set up and deployed. The setup is locked to protect the integrity of the pairings.</p>
            <p><strong>Are you the organizer?</strong> Run the setup locally to manage or reset.</p>
        </div>
        
        <div class="info-box" style="margin-top: 20px;">
            <h3>For Participants:</h3>
            <p>This is the organizer's setup page. You're looking for the reveal page!</p>
            <div class="button-group" style="margin-top: 15px;">
                <a href="index.html" class="btn-primary">🎁 Go to Reveal Page</a>
            </div>
        </div>

        <div class="info-box" style="margin-top: 20px;">
            <h3>For Organizer:</h3>
            <p>To manage this deployment:</p>
            <ul style="margin: 10px 0 0 20px; line-height: 1.8;">
                <li>Clone/download this repository</li>
                <li>Run setup.html locally</li>
                <li>Use <code>manage.html</code> to export or reset</li>
            </ul>
        </div>
    ` : `
        <div class="warning-box">
            <h3>⚠️ Double Santa Already Setup</h3>
            <p>The Double Santa has already been generated and cannot be modified.</p>
            <p>This is intentional to prevent accidental changes that would ruin the surprise!</p>
        </div>
        
        <div class="info-box" style="margin-top: 20px;">
            <h3>What You Can Do:</h3>
            <ul style="margin: 10px 0 0 20px; line-height: 1.8;">
                <li>📥 <strong><a href="manage.html">Export your data</a></strong> - Download data.json and codes</li>
                <li>👥 <strong><a href="index.html">View assignments</a></strong> - Go to reveal page</li>
                <li>🔄 <strong><a href="manage.html">Create new exchange</a></strong> - Reset and start over</li>
            </ul>
        </div>

        <div class="button-group" style="margin-top: 25px;">
            <a href="manage.html" class="btn-primary">⚙️ Manage Setup</a>
            <a href="index.html" class="btn-secondary">Go to Reveal Page</a>
        </div>
    `;
    
    document.getElementById('setupForm').innerHTML = message;
    document.getElementById('generateBtn').style.display = 'none';
}

function showError(message) {
    alert('❌ ' + message);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


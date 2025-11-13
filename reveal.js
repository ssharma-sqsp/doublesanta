// Double Secret Santa - Reveal Logic

let cachedData = null;

window.addEventListener('DOMContentLoaded', async () => {
    // Try to load data from file (GitHub Pages) or localStorage (local)
    await loadData();
    
    // Allow Enter key to reveal
    document.getElementById('nameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('codeInput').focus();
        }
    });
    
    document.getElementById('codeInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            revealAssignment();
        }
    });
});

async function loadData() {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    // For local: Check localStorage first (so new test data works)
    if (isLocal) {
        const localData = localStorage.getItem('secretSantaData');
        if (localData) {
            cachedData = localData;
            console.log('✅ Data loaded from localStorage (local mode)');
            return;
        }
        
        // Try local file
        try {
            const response = await fetch('data.json');
            if (response.ok) {
                const json = await response.json();
                cachedData = json.data;
                console.log('✅ Data loaded from local file');
                return;
            }
        } catch (error) {
            // No local file
        }
    } else {
        // For deployed: Check GitHub first (production source of truth)
        const GITHUB_DATA_URL = window.DOUBLESANTA_CONFIG?.DATA_URL || 'https://ssharma-sqsp.github.io/doublesanta/data.json';
        
        try {
            const response = await fetch(GITHUB_DATA_URL, {
                cache: 'no-cache' // Always get fresh data
            });
            if (response.ok) {
                const json = await response.json();
                cachedData = json.data;
                console.log('✅ Data loaded from GitHub Pages');
                return;
            }
        } catch (error) {
            console.log('⚠️ Could not reach GitHub, trying fallback...');
        }
        
        // Fallback to localStorage
        const localData = localStorage.getItem('secretSantaData');
        if (localData) {
            cachedData = localData;
            console.log('✅ Data loaded from localStorage (fallback)');
            return;
        }
    }
    
    // No data found anywhere
    console.log('❌ No data found');
    showNotSetupYet();
}

function revealAssignment() {
    const name = document.getElementById('nameInput').value.trim();
    const code = document.getElementById('codeInput').value.trim().toUpperCase();
    
    // Clear previous error
    hideError();
    
    // Validation
    if (!name) {
        showError('Please enter your name');
        return;
    }
    
    if (!code) {
        showError('Please enter your secret code');
        return;
    }
    
    if (!cachedData) {
        showError('Double Santa data not found. Please contact the organizer.');
        return;
    }
    
    try {
        // Decrypt data
        const data = decryptData(cachedData);
        
        // Find assignment by code
        if (!data[code]) {
            showError('Invalid secret code. Please check your code and try again.');
            return;
        }
        
        const assignment = data[code];
        
        // Verify name matches (case-insensitive)
        if (assignment.name.toLowerCase() !== name.toLowerCase()) {
            showError('The name doesn\'t match this code. Please check your name and code.');
            return;
        }
        
        // Display assignment
        displayAssignment(assignment);
        
    } catch (error) {
        showError('Failed to load assignment. Please try again.');
        console.error(error);
    }
}

function displayAssignment(assignment) {
    // Hide login form
    document.getElementById('loginForm').style.display = 'none';
    
    // Show assignment
    const assignmentSection = document.getElementById('assignmentSection');
    assignmentSection.style.display = 'block';
    
    // Fill in details
    document.getElementById('duoPartner').textContent = assignment.partner;
    
    const targetDuoDiv = document.getElementById('targetDuo');
    targetDuoDiv.innerHTML = assignment.targetDuo.map(name => `
        <div class="target-name">${escapeHtml(name)}</div>
    `).join('');
    
    // Animate in
    assignmentSection.style.animation = 'fadeIn 0.5s ease-in';
}

function logout() {
    // Hide assignment
    document.getElementById('assignmentSection').style.display = 'none';
    
    // Show login form
    document.getElementById('loginForm').style.display = 'block';
    
    // Clear inputs
    document.getElementById('nameInput').value = '';
    document.getElementById('codeInput').value = '';
    
    hideError();
}

function showNotSetupYet() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('notSetupYet').style.display = 'block';
}

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = '❌ ' + message;
    errorDiv.style.display = 'block';
}

function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


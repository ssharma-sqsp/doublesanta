// Double Santa Configuration
// Update this file with your GitHub Pages URL after deployment

const CONFIG = {
    // Your GitHub Pages URL (without trailing slash)
    GITHUB_PAGES_URL: 'https://ssharma-sqsp.github.io/doublesanta',
    
    // Data file name (usually don't need to change this)
    DATA_FILE: 'data.json',
    
    // Full data URL (auto-constructed)
    get DATA_URL() {
        return `${this.GITHUB_PAGES_URL}/${this.DATA_FILE}`;
    }
};

// Make config available globally
window.DOUBLESANTA_CONFIG = CONFIG;


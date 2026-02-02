
// Order and passwords for all levels in the adventure
// To reorder levels, just move the lines around in this array!
window.LEVELS = [
    { path: 'binary', password: 'learn' },
    { path: 'terminal', password: 'terminal' },
    { path: 'homebrew', password: 'brew' },
    { path: 'boolean-logic', password: 'bool' },
    { path: 'open-source', password: 'source' },
    { path: 'snake-game', password: 'snake' },
    { path: 'github-auth-token', password: 'token' },
    { path: 'download-git', password: 'get-git' },
    { path: 'create-github-repo', password: 'clone' },
    { path: 'scratch-submission', password: 'scratch' },
    { path: 'vscode', password: 'vscode' },
    { path: 'submit-scratch-canvas', password: 'almost-done' },
    { path: 'end', password: 'ADVENTURE' }
];


// Helper to get the full path for a level (always uses index.html)
window.getLevelUrl = function(levelPath) {
    return '../' + levelPath + '/index.html';
};

// Normalize folder names (handles old PascalCase and new lowercase-with-dashes)
window.normalizeFolderName = function(name) {
    // Map old folder/file names to new folder names
    const oldToNew = {
        // Folder name mappings
        'binary': 'binary',
        'booleanlogic': 'boolean-logic',
        'creategithubrepoandclone': 'create-github-repo',
        'downloadgit': 'download-git',
        'end': 'end',
        'githubauthtoken': 'github-auth-token',
        'homebrew': 'homebrew',
        'opensource': 'open-source',
        'scratchsubmission': 'scratch-submission',
        'snakegame': 'snake-game',
        'submitscratchoncanvas': 'submit-scratch-canvas',
        'terminal': 'terminal',
        'vocab': 'vocab',
        'vscode': 'vscode',
        // Old file name mappings (for backwards compatibility)
        'snake': 'snake-game',
        'gitsetupguide': 'download-git',
        'githubauthokenstepper': 'github-auth-token',
        'githubauthtokenstepper': 'github-auth-token'
    };
    
    // Normalize: lowercase, remove dashes for lookup
    const normalized = name.toLowerCase().replace(/-/g, '');
    return oldToNew[normalized] || name.toLowerCase();
};

// Get current level info based on current path
window.getLevelInfo = function(currentPath) {
    // Extract folder name from various input formats
    // e.g., "terminal/index.html" -> "terminal", "Binary/index.html" -> "binary"
    let folder = currentPath
        .replace(/\.html$/, '')           // Remove .html extension
        .replace(/\/index$/, '')          // Remove /index
        .replace(/^\.\.\//, '')           // Remove leading ../
        .split('/')[0];                   // Get first path segment
    
    // Normalize the folder name to handle old naming conventions
    folder = window.normalizeFolderName(folder);
    
    const idx = window.LEVELS.findIndex(lvl => lvl.path === folder);
    
    if (idx === -1) {
        console.error('[getLevelInfo] Level not found:', folder, '(original:', currentPath, ')');
        return { current: null, next: null, idx: -1 };
    }

    const currentLevel = window.LEVELS[idx];
    const nextLevel = window.LEVELS[idx + 1] || null;

    return {
        current: currentLevel,
        next: nextLevel,
        idx
    };
};

// Shared navigation logic - always go through password portal
window.goToNextPage = function() {
    window.location.href = "../password-portal/index.html";
};
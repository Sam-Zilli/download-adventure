// Order and passwords for all levels in the adventure
// To reorder levels, just move the lines around in this array
window.LEVELS = [

    // { path: 'binary', password: 'learn' },

    // Flags like -a to see hidden files
    { path: 'terminal-flags', password: 'flags' },

    // Terminal commands like ls -a to see hidden files
    { path: 'terminal', password: 'terminal' },

    // How Brew Works + Install it
    { path: 'homebrew', password: 'brew' },

    // Open Source v.s. Closed Source
    { path: 'open-source', password: 'source' },

    // brew install vscode
    { path: 'VSCode', password: 'vscode' },

    // unnecessary game of snake lol
    { path: 'snake-game', password: 'snake' },

    // Install Git + recap of what they've done so far
    { path: 'install-git', password: 'get-git' },

    // How Git works: the 4 locations (working dir, staging, local repo, remote)
    { path: 'git-workflow', password: 'workflow' },

    // Open VS Code and install the Python extension
    { path: 'python-extension', password: 'python' },

    // Final Boss Level:
    // Create a Github Repo on Github.com + add me as collaborator
    // Clone that repo in VS Code
    // Add Scratch project to the folder
    // Push to Github Website
    // Submit link on canvas
    { path: 'final-boss', password: 'final-boss' },

    // Full Game Recap
    // The End + Ability to go back to previous levels
    // { path: 'end', password: 'ADVENTURE' }


    // old / unused for now
    // Boolean Logic
    // { path: 'boolean-logic', password: 'bool' },
    // Clone a repo
    // { path: 'git-clone', password: 'clone' },
    // { path: 'github-vscode', password: 'github' },
    // { path: 'git-basics', password: 'push' },

    // { path: 'git-game', password: 'gitgame' },
    // { path: 'submit-scratch', password: 'scratch' },

    // { path: 'create-github-repo', password: 'clone' },
    // { path: 'github-auth-token', password: 'token' },
    // { path: 'download-git', password: 'get-git' },

    // { path: 'scratch-submission', password: 'scratch' },
    // { path: 'submit-scratch-canvas', password: 'almost-done' },,

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
        'terminalflags': 'terminal-flags',
        'vocab': 'vocab',
        'vscode': 'VSCode',
        'githubvscode': 'github-vscode',
        'gitbasics': 'git-basics',
        'gitclone': 'git-clone',
        'installgit': 'install-git',
        'pythonextension': 'python-extension',
        'gitworkflow': 'git-workflow',
        'finalboss': 'final-boss',
        'submitscratch': 'submit-scratch',
        'gitgame': 'git-game',
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
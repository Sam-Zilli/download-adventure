// Order and passwords for all levels in the adventure
// To reorder levels, just move the lines around in this array
window.LEVELS = [

    //Learn the difference between CLI and GUI
    { path: 'cli-vs-gui', password: 'LEARN' },


    // Practice identifying command parts (command, arguments, what it does)
    { path: 'terminal-command-parts', password: 'COMMANDS' },

    // Practice identifying command parts with multiple arguments
    { path: 'terminal-command-parts-2', password: 'COMMANDS2' },

    // Explains what flags are and how to use them like -a to see hidden files
    { path: 'terminal-flags', password: 'FLAGS' },

    // Practice identifying command parts with flags
    { path: 'terminal-command-parts-3', password: 'COMMANDS3' },

    // Open Source v.s. Closed Source
    { path: 'open-source', password: 'SOURCE' },

    // How Brew Works + Install it
    { path: 'homebrew', password: 'BREW' },

    // Install VS Code with BREW
    { path: 'VSCode', password: 'VSCODE' },

    // Terminal Simulator
    { path: 'terminal', password: 'SIMULATOR' },

    // unnecessary game of snake lol
    { path: 'snake-game', password: 'SNAKE' },

    // Download and install Python from python.org
    { path: 'install-python', password: 'PYTHON' },


    // Open VS Code and install the Python extension
    { path: 'python-extension', password: 'PYTHON2' },

    // Turn off AI coding help in VS Code
    { path: 'disable-ai-coding', password: 'no-ai' },

    // Install GitHub Desktop
    { path: 'install-github-desktop', password: 'get-github-desktop' },


    // Install Git + recap of what they've done so far
    { path: 'install-git', password: 'get-git' },


    // // How Git works: the 4 locations (working dir, staging, local repo, remote)
    // { path: 'git-workflow', password: 'workflow' },
    // Download and install Node.js from nodejs.org
    { path: 'install-node', password: 'nodejs' },

    // Final Boss Level:
    // Create a Github Repo on Github.com + add me as collaborator
    // Clone that repo in VS Code
    // Add Scratch project to the folder
    // Push to Github Website
    // Submit link on canvas
    // { path: 'final-boss', password: 'final-boss' },

    // Full Game Recap
    // The End + Ability to go back to previous levels
    { path: 'end', password: 'ADVENTURE' }



        // // Alternative: Download VS Code from website
    // { path: 'vscode-app', password: 'vscode' },


    // // Wait for the prompt before typing new commands
    // { path: 'terminal-prompt', password: 'ready' },


    // { path: 'binary', password: 'learn' },



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
        'clivsgui': 'cli-vs-gui',
        'cli-vs-gui': 'cli-vs-gui',
        'commandparts': 'terminal-command-parts',
        'terminalcommandparts': 'terminal-command-parts',
        'terminal-command-parts': 'terminal-command-parts',
        'commandparts2': 'terminal-command-parts-2',
        'commandparts-2': 'terminal-command-parts-2',
        'terminalcommandparts2': 'terminal-command-parts-2',
        'terminal-command-parts-2': 'terminal-command-parts-2',
        'commandparts3': 'terminal-command-parts-3',
        'commandparts-3': 'terminal-command-parts-3',
        'terminalcommandparts3': 'terminal-command-parts-3',
        'terminal-command-parts-3': 'terminal-command-parts-3',
        'terminalprompt': 'terminal-prompt',
        'vocab': 'vocab',
        'vscode': 'VSCode',
        'vscodeapp': 'vscode-app',
        'githubvscode': 'github-vscode',
        'gitbasics': 'git-basics',
        'gitclone': 'git-clone',
        'installgit': 'install-git',
        'installgithubdesktop': 'install-github-desktop',
        'installpython': 'install-python',
        'installnode': 'install-node',
        'pythonextension': 'python-extension',
        'disableaicoding': 'disable-ai-coding',
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

// Order and passwords for all levels in the adventure
window.LEVELS = [
    // Where it goes amd what the password is to get there
    { file: '../Binary/index.html', password: 'learn' },
    { file: '../terminal/index.html', password: 'terminal' },
    { file: '../Homebrew/Homebrew.html', password: 'brew' },
    { file: '../BooleanLogic/index.html', password: 'bool' },
    { file: '../OpenSource/index.html', password: 'source' },
    { file: '../SnakeGame/snake.html', password: 'snake' },
    { file: '../GithubAuthToken/GithubAuthTokenStepper.html', password: 'token' },
    { file: '../DownloadGit/GitSetupGuide.html', password: 'get-git' },
    { file: '../CreateGithubRepoAndClone/index.html', password: 'clone' },
    { file: '../ScratchSubmission/index.html', password: 'scratch' },
    { file: '../VSCode/index.html', password: 'vscode' },
    { file: '../SubmitScratchOnCanvas/index.html', password: 'almost-done' },
    { file: '../End/end.html', password: 'ADVENTURE' }
];


// Make getLevelInfo globally available
window.getLevelInfo = function(currentFile) {
    console.log('[DEBUG getLevelInfo] Called with:', currentFile);
    console.log('[DEBUG getLevelInfo] window.LEVELS exists:', typeof window.LEVELS !== 'undefined');
    console.log('[DEBUG getLevelInfo] LEVELS length:', window.LEVELS ? window.LEVELS.length : 'undefined');
    console.log('[DEBUG getLevelInfo] Full LEVELS array:', window.LEVELS);
    
    const idx = window.LEVELS.findIndex(lvl => {
        const endsWith = lvl.file.endsWith(currentFile);
        console.log('[DEBUG getLevelInfo] Checking', lvl.file, 'endsWith', currentFile, '=', endsWith);
        return endsWith;
    });
    
    console.log('[DEBUG getLevelInfo] Found index:', idx);
    if (idx === -1) {
        console.error('[DEBUG getLevelInfo] File not found in LEVELS array:', currentFile);
        // Log the entire LEVELS array for inspection
        console.log('[DEBUG getLevelInfo] Available levels:', window.LEVELS.map(l => l.file));
        return { current: null, next: null, idx: -1 };
    }

    const currentLevel = window.LEVELS[idx];
    const nextLevel = window.LEVELS[idx + 1] || null;
    
    console.log('[DEBUG getLevelInfo] Current level:', currentLevel);
    console.log('[DEBUG getLevelInfo] Next level:', nextLevel);

    return {
        current: currentLevel,
        next: nextLevel,
        idx
    };
};

// Shared navigation logic for all levels
window.goToNextPage = function(currentFile) {
    // Always route to the Password Portal for the next level
    window.location.href = "../PasswordPortal/PasswordPortal.html";
};
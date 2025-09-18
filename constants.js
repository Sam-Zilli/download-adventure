
// Order and passwords for all levels in the adventure
window.LEVELS = [
    // Where it goes amd what the password is to get there
    { file: '../Binary/index.html', password: 'learn' },
    { file: '../terminal/index.html', password: 'terminal' },
    { file: '../Homebrew/Homebrew.html', password: 'download' },
    { file: '../BooleanLogic/index.html', password: 'logic' },
    { file: '../OpenSource/index.html', password: 'source' },
    { file: '../SnakeGame/snake.html', password: 'game-time' },
    { file: '../GithubAuthToken/GithubAuthTokenStepper.html', password: 'auth' },
    { file: '../DownloadGit/GitSetupGuide.html', password: 'get-git' },
    { file: '../CreateGithubRepoAndClone/index.html', password: 'repo' },
    { file: '../ScratchSubmission/index.html', password: 'IGOTGIT' },
    { file: '../VSCode/index.html', password: 'vscode' },
    { file: '../SubmitScratchOnCanvas/index.html', password: 'GRADES' },
    { file: '../End/end.html', password: 'ADVENTURE' }
];





// Make getLevelInfo globally available
window.getLevelInfo = function(currentFile) {
    console.log('[DEBUG] getLevelInfo called with:', currentFile);
    
    const idx = window.LEVELS.findIndex(lvl => lvl.file.endsWith(currentFile));
    
    console.log('[DEBUG] Found index:', idx);
    if (idx === -1) {
        console.error('[DEBUG] File not found in LEVELS array:', currentFile);
        // Log the entire LEVELS array for inspection
        console.log('[DEBUG] Available levels:', window.LEVELS.map(l => l.file));
        return { current: null, next: null, idx: -1 };
    }

    const currentLevel = window.LEVELS[idx];
    const nextLevel = window.LEVELS[idx + 1] || null;
    
    console.log('[DEBUG] Current level:', currentLevel);
    console.log('[DEBUG] Next level:', nextLevel);

    return {
        current: currentLevel,
        next: nextLevel,
        idx
    };
};
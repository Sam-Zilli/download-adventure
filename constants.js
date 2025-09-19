
// Order and passwords for all levels in the adventure
window.LEVELS = [
    // Where it goes amd what the password is to get there
    { file: '../Binary/index.html', password: 'learn' },
    { file: '../terminal/index.html', password: 'one' },
    { file: '../Homebrew/Homebrew.html', password: 'two' },
    { file: '../BooleanLogic/index.html', password: 'three' },
    { file: '../OpenSource/index.html', password: 'four' },
    { file: '../SnakeGame/snake.html', password: 'five' },
    { file: '../GithubAuthToken/GithubAuthTokenStepper.html', password: 'six' },
    { file: '../DownloadGit/GitSetupGuide.html', password: 'seven' },
    { file: '../CreateGithubRepoAndClone/index.html', password: 'eight' },
    { file: '../ScratchSubmission/index.html', password: 'nine' },
    { file: '../VSCode/index.html', password: 'ten' },
    { file: '../SubmitScratchOnCanvas/index.html', password: 'eleven' },
    { file: '../End/end.html', password: 'twelve' }
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

// Order and passwords for all levels in the adventure
window.LEVELS = [
    // Where it goes amd what the password is to get there
    { file: '../Binary/BinaryIntroAndGame.html', password: 'learn' },
    { file: '../terminal/Terminal.html', password: 'terminal' },
    { file: '../Homebrew/Homebrew.html', password: 'download' },
    { file: '../BooleanLogic/BooleanLogicPatternGame.html', password: 'logic' },
    { file: '../OpenSource/open-source-game/index.html', password: 'source' },
    { file: '../SnakeGame/snake.html', password: 'game-time' },
    { file: '../GithubAuthToken/GithubAuthTokenStepper.html', password: 'auth' },
    { file: '../DownloadGit/GitSetupGuide.html', password: 'get-git' },
    { file: '../CreateGithubRepoAndClone/index.html', password: 'repo' },
    { file: '../ScratchSubmission/index.html', password: 'IGOTGIT' },
    { file: '../VSCode/index.html', password: 'vscode' },
    { file: '../End/end.html', password: 'adventure' }
];

// Make getLevelInfo globally available
window.getLevelInfo = function(currentFile) {
    // Support both with and without folder prefix
    const idx = window.LEVELS.findIndex(lvl => lvl.file.endsWith(currentFile));
    console.log("getLevelInfo: idx=" + idx + " for " + currentFile);
    console.log(window.LEVELS[idx]);
    return {
        current: window.LEVELS[idx],
        next: window.LEVELS[idx + 1] || null,
        idx
    };
};
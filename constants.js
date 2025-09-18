
// Order and passwords for all levels in the adventure
window.LEVELS = [
    // Where it goes amd what the password is to get there
    { file: '/Binary/BinaryIntroAndGame.html', password: 'learn' },
    { file: '/Terminal/Terminal.html', password: 'terminal' },
    { file: '/Homebrew/Homebrew.html', password: 'download' },
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
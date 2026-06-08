// Screenshot Detection and Copy Prevention
// Include this file in any page that needs anti-cheating measures

(function() {
    'use strict';

    // Add the screenshot warning modal to the page
    function injectModal() {
        const modalHTML = `
            <div class="screenshot-warning" id="screenshot-warning">
                <div class="warning-content">
                    <div class="warning-icon">⚠️</div>
                    <h2>Screenshot Detected</h2>
                    <p>A notification has been sent to your professor.</p>
                    <p style="font-size: 0.9em; color: #999;">Please complete the assignment without external assistance.</p>
                    <button class="warning-close" onclick="closeScreenshotWarning()">I Understand</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Add CSS styles for the modal
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Screenshot Warning Modal */
            .screenshot-warning {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                z-index: 999999;
                justify-content: center;
                align-items: center;
            }

            .screenshot-warning.active {
                display: flex;
            }

            .warning-content {
                background: #1a1a2e;
                border: 3px solid #ff6b6b;
                border-radius: 12px;
                padding: 40px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 0 50px rgba(255, 107, 107, 0.5);
            }

            .warning-icon {
                font-size: 4em;
                margin-bottom: 20px;
            }

            .warning-content h2 {
                color: #ff6b6b;
                margin-bottom: 15px;
                font-size: 1.8em;
            }

            .warning-content p {
                color: #eee;
                margin-bottom: 10px;
                line-height: 1.6;
            }

            .warning-close {
                margin-top: 20px;
                padding: 12px 30px;
                background: #ff6b6b;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 1.1em;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                transition: background 0.3s;
            }

            .warning-close:hover {
                background: #ff5252;
            }
        `;
        document.head.appendChild(style);
    }

    // Show the screenshot warning
    function showScreenshotWarning() {
        console.log('🚨 SCREENSHOT WARNING SHOWN');
        const modal = document.getElementById('screenshot-warning');
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Close the warning modal
    window.closeScreenshotWarning = function() {
        console.log('✅ Warning closed');
        const modal = document.getElementById('screenshot-warning');
        if (modal) {
            modal.classList.remove('active');
        }
    };

    // Detect screenshot attempts (Mac-specific)
    let focusLossCount = 0;
    let lastBlurTime = 0;
    const BLUR_WINDOW = 3000; // 3 second window
    const QUICK_BLUR_THRESHOLD = 2; // Number of quick blurs to trigger warning

    // Listen for Mac screenshot shortcuts (Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5)
    document.addEventListener('keydown', (e) => {
        if (e.metaKey && e.shiftKey) {
            const key = e.key;
            const code = e.code;
            
            console.log(`[Screenshot Detection] Cmd+Shift detected with key: ${key}, code: ${code}`);
            
            // Check for number keys 3, 4, or 5
            if (key === '3' || key === '4' || key === '5' || 
                code === 'Digit3' || code === 'Digit4' || code === 'Digit5') {
                console.log('🚨 [Screenshot Detection] Screenshot shortcut detected!');
                e.preventDefault();
                showScreenshotWarning();
            }
        }
    });

    // Detect page visibility changes (user switches apps to take screenshot)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            console.log('[Screenshot Detection] Page hidden (user may be taking screenshot)');
            showScreenshotWarning();
        }
    });

    // Detect window blur (more aggressive detection)
    window.addEventListener('blur', () => {
        const now = Date.now();
        console.log(`[Screenshot Detection] Window blur at ${now}`);
        
        // Check if this blur is within the time window
        if (now - lastBlurTime < BLUR_WINDOW) {
            focusLossCount++;
            console.log(`[Screenshot Detection] Quick blur #${focusLossCount}`);
            
            if (focusLossCount >= QUICK_BLUR_THRESHOLD) {
                console.log('🚨 [Screenshot Detection] Multiple quick blurs - showing warning');
                showScreenshotWarning();
                focusLossCount = 0; // Reset after warning
            }
        } else {
            // Reset if outside the window
            focusLossCount = 1;
        }
        
        lastBlurTime = now;
    });

    // Reset focus loss count when window regains focus
    window.addEventListener('focus', () => {
        console.log('[Screenshot Detection] Window focus regained');
        // Don't reset count immediately - let it decay naturally via time window
    });

    // Prevent copying and context menu
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('copy', (e) => e.preventDefault());
    document.addEventListener('cut', (e) => e.preventDefault());
    
    // Prevent keyboard shortcuts for copying
    document.addEventListener('keydown', (e) => {
        // Prevent Ctrl+C, Cmd+C, Ctrl+X, Cmd+X, Ctrl+A, Cmd+A
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
            e.preventDefault();
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectStyles();
            injectModal();
            console.log('[Screenshot Detection] Initialized');
        });
    } else {
        injectStyles();
        injectModal();
        console.log('[Screenshot Detection] Initialized');
    }
})();

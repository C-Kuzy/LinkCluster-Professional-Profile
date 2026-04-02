/*
 Author: Connor Kouznetsov (C-Kuzy)
 Description: Terminal-style typewriter effect for name and description
*/

// Configuration
const typewriterConfig = {
    name: "Connor Kouznetsov",
    description: "Incoming Software Engineer @ MetLife | xAIE → SWE @ Equitus<br>\
                  xSWE @ Bulls Racing FSAE | CSE @ USF",
    nameSpeed: 85,                  // Milliseconds per character for name
    descriptionSpeed: 40,           // Milliseconds per character for description
    delayBeforeDescription: 500,    // Pause between name and description
    scanDuration: 1000,             // Duration per word during scan (1 second)
    delayBeforeScan: 500,           // Pause before starting scan
    
    // Characters to exclude from underline scanning (customize as needed)
    excludeFromScan: ['@', '|', ',', '!', '?', ':', ';', '-', '_', '(', ')', '[', ']', '{', '}']
};

// Get DOM elements
const nameElement = document.getElementById('name-text');
const descriptionElement = document.getElementById('description-text');

if (!nameElement || !descriptionElement) {
    console.error('Typewriter: Required elements not found');
    throw new Error('name-text or description-text element is missing');
}

// Typewriter function
function typeWriter(element, text, speed, callback, showCursor = false) {
    let index = 0;
    let displayText = '';
    const cursorId = `cursor-${Date.now()}-${Math.random()}`;
    
    // Add cursor during typing
    const cursor = `<span class="typewriter-cursor" id="${cursorId}">|</span>`;
    
    function type() {
        if (index < text.length) {
            // Check if we're at a tag
            if (text[index] === '<') {
                // Find the end of the tag
                const tagEnd = text.indexOf('>', index);
                if (tagEnd !== -1) {
                    // Add the entire tag at once
                    displayText += text.substring(index, tagEnd + 1);
                    index = tagEnd + 1;
                    element.innerHTML = displayText + cursor;
                    setTimeout(type, 0); // Continue immediately
                    return;
                }
            }
            
            // Add regular character
            displayText += text[index];
            element.innerHTML = displayText + cursor;
            index++;
            
            setTimeout(type, speed);
        } else {
            // Typing complete
            if (showCursor) {
                // Keep cursor and make it breathe
                element.innerHTML = displayText + cursor;
                const cursorElement = document.getElementById(cursorId);
                if (cursorElement) {
                    cursorElement.classList.add('breathing');
                }
            } else { element.innerHTML = displayText; } // Remove cursor
            
            if (callback) { setTimeout(callback, 0); }
        }
    }
    
    type();
}

// Scanning effect - underlines each word sequentially with breathing effect
function scanText(callback) {
    const nameText = typewriterConfig.name;
    const descriptionText = typewriterConfig.description;
    
    // Check if a token should be excluded from scanning
    function shouldExclude(token) {
        // Check if token is only excluded characters
        const cleanToken = token.trim();
        if (!cleanToken) return true;

        // Check if all characters in token are in excludeFromScan list
        return [...cleanToken].every(char => typewriterConfig.excludeFromScan.includes(char));
    }
    
    // Split text into scannable parts (words) and non-scannable parts (symbols)
    function wrapWords(text, isHTML = false) {
        if (isHTML) {
            // Handle HTML with <br> tags
            const parts = text.split('<br>');
            return parts.map(part => {
                // Split by spaces and special characters, preserving them
                return part.split(/(\s+)/).map(segment => {
                    if (!segment.trim()) return segment; // Keep whitespace as-is
                    
                    // Split into letter/number sequences and symbol sequences
                    const tokens = segment.split(/([^a-zA-Z0-9]+)/);
                    return tokens.map(token => {
                        if (!token) return '';
                        if (shouldExclude(token)) {
                            return token; // Don't wrap excluded characters
                        }
                        // Only wrap if it contains letters or numbers
                        if (/[a-zA-Z0-9]/.test(token)) {
                            return `<span class="scannable-word">${token}</span>`;
                        }
                        return token;
                    }).join('');
                }).join('');
            }).join('<br>');
        } else {
            // Plain text
            return text.split(/(\s+)/).map(segment => {
                if (!segment.trim()) return segment; // Keep whitespace as-is
                
                // Split into letter/number sequences and symbol sequences
                const tokens = segment.split(/([^a-zA-Z0-9]+)/);
                return tokens.map(token => {
                    if (!token) return '';
                    if (shouldExclude(token)) {
                        return token; // Don't wrap excluded characters
                    }
                    // Only wrap if it contains letters or numbers
                    if (/[a-zA-Z0-9]/.test(token)) {
                        return `<span class="scannable-word">${token}</span>`;
                    }
                    return token;
                }).join('');
            }).join('');
        }
    }
    
    // Replace content with wrapped words and keep cursor on description
    nameElement.innerHTML = wrapWords(nameText, false);
    const cursor = '<span class="typewriter-cursor breathing">|</span>';
    descriptionElement.innerHTML = wrapWords(descriptionText, true) + cursor;
    
    // Get all scannable words in order
    const allWords = [
        ...nameElement.querySelectorAll('.scannable-word'),
        ...descriptionElement.querySelectorAll('.scannable-word')
    ];
    
    let currentIndex = 0;
    
    function scanNextWord() {
        if (currentIndex < allWords.length) {
            const word = allWords[currentIndex];
            
            // Add scanning class
            word.classList.add('scanning');
            
            // Overlap transitions - start fading out current while next starts fading in
            setTimeout(() => {
                word.classList.remove('scanning');
                word.classList.add('scan-complete');
            }, typewriterConfig.scanDuration * 0.7); // Start fade out at 70%
            
            // Move to next word with slight overlap
            setTimeout(() => {
                currentIndex++;
                scanNextWord();
            }, typewriterConfig.scanDuration * 0.6); // Next word starts at 60%
        } else {
            // Scanning complete
            if (callback) { setTimeout(callback, typewriterConfig.scanDuration * 0.4); }
        }
    }
    
    scanNextWord();
}

// Start typing sequence
function startTypewriterSequence() {
    // TEMPORARY: Clear sessionStorage to see animation (remove for production)
    sessionStorage.removeItem('typewriter-completed');
    
    // Check if already visited (using sessionStorage for one-time per session)
    const hasVisited = sessionStorage.getItem('typewriter-completed');
    
    if (hasVisited) {
        // Show text immediately without animation
        nameElement.innerHTML = typewriterConfig.name;
        descriptionElement.innerHTML = typewriterConfig.description + 
            '<span class="typewriter-cursor breathing">|</span>';
        return;
    }
    
    // Clear elements first
    nameElement.innerHTML = '';
    descriptionElement.innerHTML = '';
    
    // Type name first
    typeWriter(nameElement, typewriterConfig.name, typewriterConfig.nameSpeed, () => {
        // After name is complete, wait then type description
        setTimeout(() => {
            typeWriter(descriptionElement, typewriterConfig.description, typewriterConfig.descriptionSpeed, () => {
                // After typing completes, start scanning effect
                setTimeout(() => {
                    scanText(() => {
                        // Mark as completed for this session
                        sessionStorage.setItem('typewriter-completed', 'true');
                    });
                }, typewriterConfig.delayBeforeScan);
            }, false);
        }, typewriterConfig.delayBeforeDescription);
    }, false);
}

// Start the typewriter effect when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTypewriterSequence);
} else { startTypewriterSequence(); }
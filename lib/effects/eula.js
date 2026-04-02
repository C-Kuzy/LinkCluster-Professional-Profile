/**
 * EULA Modal and Jet-Away Animation Effects
 * Author: Connor Kouznetsov (C-Kuzy)
 * © 2025 Connor Kouznetsov (C-Kuzy Solutions)
 * Licensed under the C-Kuzy Solutions EULA. Attribution required.
 */

// Load EULA content from external file
async function loadEulaContent() {
    try {
        const response = await fetch('lib/data/EULA.html');
        if (!response.ok) {
            throw new Error('Failed to load EULA content');
        }
        const content = await response.text();
        const eulaContent = document.querySelector('.eula-content');
        if (eulaContent) {
            eulaContent.innerHTML = content;
        }
    } catch (error) {
        console.error('Error loading EULA content:', error);
        const eulaContent = document.querySelector('.eula-content');
        if (eulaContent) {
            eulaContent.innerHTML = '<h1>Error</h1><p>Unable to load EULA content. Please try again later.</p>';
        }
    }
}

// Create jet elements for the animation
function createJetElements() {
    // Select all visible elements that should participate in the jet-away effect
    const elements = document.querySelectorAll('main > *:not(.enhanced-footer), .logoContainer, .greetings, .about, .link');
    const jetElements = [];
    
    elements.forEach(element => {
        // Skip the modal and its children
        if (element.closest('.eula-modal')) return;
        
        // Create a copy of the element for the jet-away effect
        const rect = element.getBoundingClientRect();
        const clone = element.cloneNode(true);
        
        clone.classList.add('jet-element');
        clone.style.position = 'fixed';
        clone.style.left = rect.left + 'px';
        clone.style.top = rect.top + 'px';
        clone.style.width = rect.width + 'px';
        clone.style.height = rect.height + 'px';
        clone.style.zIndex = '1000';
        clone.style.pointerEvents = 'none';
        
        // Calculate random direction for jet-away effect
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate direction away from center
        const deltaX = elementCenterX - centerX;
        const deltaY = elementCenterY - centerY;
        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
        const normalizedX = deltaX / magnitude;
        const normalizedY = deltaY / magnitude;
        
        // Add some randomness and increase distance
        const distance = 1500 + Math.random() * 500;
        const randomFactor = 0.5 + Math.random();
        const finalDeltaX = normalizedX * distance * randomFactor;
        const finalDeltaY = normalizedY * distance * randomFactor;
        
        clone.style.setProperty('--dx', finalDeltaX + 'px');
        clone.style.setProperty('--dy', finalDeltaY + 'px');
        
        document.body.appendChild(clone);
        jetElements.push({clone, original: element});
    });
    
    return jetElements;
}

// Trigger the jet-away animation
function triggerJetAway() {
    // Create jet elements
    const jetElements = createJetElements();
    
    // Hide original elements
    jetElements.forEach(({original}) => {
        original.style.opacity = '0';
    });
    
    // Start jet-away animation
    setTimeout(() => {
        jetElements.forEach(({clone}) => {
            clone.classList.add('jet-away');
        });
    }, 50);
    
    // Clean up jet elements after animation
    setTimeout(() => {
        jetElements.forEach(({clone}) => {
            if (clone.parentNode) {
                clone.parentNode.removeChild(clone);
            }
        });
    }, 1000);
}

// Show the EULA modal with jet-away effect
function showEula() {
    const modal = document.getElementById('eulaModal');
    
    // Add close instruction at the top of modal content if not already present
    const eulaContent = modal.querySelector('.eula-content');
    if (eulaContent && !eulaContent.querySelector('.close-instruction')) {
        const instruction = document.createElement('p');
        instruction.className = 'close-instruction';
        instruction.style.cssText = 'text-align: center; font-size: 0.9rem; opacity: 0.7; margin-bottom: 20px; font-style: italic;';
        instruction.textContent = '[PRESS "ESC" TO EXIT]';
        eulaContent.insertBefore(instruction, eulaContent.firstChild);
    }
    
    // Trigger jet-away effect
    triggerJetAway();
    
    // Show EULA modal after jet-away starts
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 500);
}

// Close the EULA modal
function closeEula() {
    const modal = document.getElementById('eulaModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Restore original elements
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('[style*="opacity: 0"]');
        hiddenElements.forEach(element => {
            if (!element.closest('.eula-modal')) {
                element.style.opacity = '1';
            }
        });
    }, 800);
}

// Initialize EULA functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load EULA content first
    await loadEulaContent();
    
    const eulaLink = document.getElementById('eulaLink');
    
    if (eulaLink) {
        eulaLink.addEventListener('click', function(e) {
            e.preventDefault();
            showEula();
        });
    }
    
    const modal = document.getElementById('eulaModal');
    if (modal) {
        // Close modal when clicking anywhere on the modal
        modal.addEventListener('click', function(e) {
            closeEula();
        });
        
        // Prevent closing when clicking on the content itself (optional - remove if you want clicking content to also close)
        const eulaContent = modal.querySelector('.eula-content');
        if (eulaContent) {
            eulaContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Close modal when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('eulaModal');
            if (modal && modal.classList.contains('active')) {
                closeEula();
            }
        }
    });
});

// Make closeEula available globally for the close button onclick
window.closeEula = closeEula;
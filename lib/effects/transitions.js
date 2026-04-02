/*
 Universal Jet-Away Transition System
 Handles elegant transitions for all links with fade-to-black effect
 Author: Connor Kouznetsov (C-Kuzy)
*/

// Create jet elements that fly away in all directions
function createJetElements() {
    const elementsToJet = document.querySelectorAll('main > *:not(.eula-black-overlay):not(.eula-modal)');
    const container = document.body;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    elementsToJet.forEach(element => {
        // Skip if element is not visible
        if (window.getComputedStyle(element).display === 'none') return;
        
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate direction from screen center to element
        const deltaX = elementCenterX - centerX;
        const deltaY = elementCenterY - centerY;
        
        // Calculate distance for dramatic effect (2x viewport diagonal)
        const distance = Math.sqrt(viewportWidth * viewportWidth + viewportHeight * viewportHeight) * 2;
        
        // Normalize direction and apply distance
        const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
        const finalX = (deltaX / magnitude) * distance;
        const finalY = (deltaY / magnitude) * distance;
        
        // Create clone for jet-away effect
        const clone = element.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.margin = '0';
        clone.style.zIndex = '9990';
        clone.style.pointerEvents = 'none';
        
        // Set custom properties for animation
        clone.style.setProperty('--dx', `${finalX}px`);
        clone.style.setProperty('--dy', `${finalY}px`);
        
        // Apply jet-away animation
        clone.style.animation = 'jet-away 1s cubic-bezier(0.6, 0, 0.8, 0.2) forwards';
        
        container.appendChild(clone);
        
        // Hide original element
        element.style.opacity = '0';
        
        // Clean up clone after animation
        setTimeout(() => {
            clone.remove();
        }, 1000);
    });
}

// Trigger jet-away animation
function triggerJetAway() {
    createJetElements();
}

// Restore all hidden elements with staggered fade-in
function restoreElements() {
    const hiddenElements = document.querySelectorAll('main > *[style*="opacity: 0"]');
    
    hiddenElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = 'opacity 0.4s ease-in';
            element.style.opacity = '1';
        }, index * 30); // 30ms stagger between elements
    });
}

// Handle external link transitions
export function transitionToExternalLink(url, event) {
    if (event) {
        event.preventDefault();
    }
    
    const overlay = document.getElementById('transitionOverlay');
    
    // Step 1: Trigger jet-away effect
    triggerJetAway();
    
    // Step 2: Fade to black
    setTimeout(() => {
        overlay.classList.add('active');
    }, 300);
    
    // Step 3: Navigate to URL after black screen
    setTimeout(() => {
        window.open(url, '_blank');
        
        // Step 4: Fade back and restore elements
        setTimeout(() => {
            overlay.classList.remove('active');
            
            setTimeout(() => {
                restoreElements();
            }, 600);
        }, 400);
    }, 900);
}

// Handle internal modal transitions (like EULA)
export function transitionToModal(modalId, contentLoader = null) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('transitionOverlay');
    
    if (!modal) {
        console.error(`Modal with id "${modalId}" not found`);
        return;
    }
    
    // Step 1: Trigger jet-away effect
    triggerJetAway();
    
    // Step 2: Fade to black
    setTimeout(() => {
        overlay.classList.add('active');
    }, 300);
    
    // Step 3: Show modal after black screen
    setTimeout(() => {
        // Load content if loader function provided
        if (contentLoader && typeof contentLoader === 'function') {
            contentLoader(modal);
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 900);
}

// Close modal with reverse transition
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('transitionOverlay');
    
    if (!modal) {
        console.error(`Modal with id "${modalId}" not found`);
        return;
    }
    
    // Step 1: Hide modal
    modal.classList.remove('active');
    
    // Step 2: Fade out black overlay
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 400);
    
    // Step 3: Restore elements
    setTimeout(() => {
        document.body.style.overflow = 'auto';
        restoreElements();
    }, 1000);
}

// Initialize transition system
export function initTransitionSystem() {
    // Overlay is now in HTML, so just log initialization
    console.log('✨ Universal transition system initialized');
}

// Auto-initialize when module loads
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTransitionSystem);
    } else {
        initTransitionSystem();
    }
}

// Export utilities
export { triggerJetAway, restoreElements };

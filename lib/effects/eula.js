/**
 * EULA Modal Functionality with Universal Transition System
 * Author: Connor Kouznetsov (C-Kuzy)
 * © 2025 Connor Kouznetsov (C-Kuzy Solutions)
 * Licensed under the C-Kuzy Solutions EULA. Attribution required.
 */

import { transitionToModal, closeModal } from './transitions.js';

// Load EULA content from external file
async function loadEulaContent() {
    try {
        const response = await fetch('lib/data/EULA.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        return html;
    } catch (error) {
        console.error('Error loading EULA content:', error);
        return '<p style="color: #ff0000;">Error loading EULA content. Please try again.</p>';
    }
}

// Show the EULA modal with enhanced transition sequence
function showEula() {
    const modal = document.getElementById('eulaModal');
    
    // Content loader function
    const loadContent = (modalElement) => {
        const eulaContent = modalElement.querySelector('.eula-content');
        
        // Add close instruction if not already present
        if (eulaContent && !eulaContent.querySelector('.close-instruction')) {
            const instruction = document.createElement('p');
            instruction.className = 'close-instruction';
            instruction.style.cssText = 'text-align: center; font-size: 0.9rem; opacity: 0.7; margin-bottom: 20px; font-style: italic;';
            instruction.textContent = '[PRESS "ESC" TO EXIT]';
            eulaContent.insertBefore(instruction, eulaContent.firstChild);
        }
    };
    
    // Use universal transition system
    transitionToModal('eulaModal', loadContent);
}

// Close the EULA modal
function closeEula() {
    closeModal('eulaModal');
}

// Initialize EULA functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load EULA content
    const eulaContent = await loadEulaContent();
    const eulaContainer = document.querySelector('#eulaModal .eula-content');
    
    if (eulaContainer) {
        eulaContainer.innerHTML = eulaContent;
    }
    
    // EULA link click handler
    const eulaLink = document.getElementById('eulaLink');
    if (eulaLink) {
        eulaLink.addEventListener('click', function(e) {
            e.preventDefault();
            showEula();
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('eulaModal');
            if (modal && modal.classList.contains('active')) {
                closeEula();
            }
        }
    });
    
    // Close when clicking outside modal content
    const modal = document.getElementById('eulaModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeEula();
            }
        });
    }
});

// Export functions for external use
export { showEula, closeEula };

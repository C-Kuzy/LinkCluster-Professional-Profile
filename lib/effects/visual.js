/*
 Visual Effects Module
 Renders animated particle system background
*/

import breezeConfig from './config.js';

// Check if THREE.js is loaded
if (typeof THREE === 'undefined') {
    console.error('THREE.js not loaded! Visual effects cannot start.');
    throw new Error('THREE.js is required for visual effects');
}

const container = document.getElementById('breeze-container');
if (!container) {
    console.error('breeze-container not found!');
    throw new Error('breeze-container element is missing');
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(breezeConfig.backgroundColor);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 1000);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.display = 'block';
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
container.appendChild(renderer.domElement);

const isMobile = window.innerWidth <= 767;
const isTablet = window.innerWidth > 767 && window.innerWidth <= 1024;
const windStreakCount = isMobile ? Math.floor(breezeConfig.streakCount * 0.5) : 
                        isTablet ? Math.floor(breezeConfig.streakCount * 0.75) : 
                        breezeConfig.streakCount;
const lines = [];
const windColors = breezeConfig.colors;

function createCurvedWindStreak() {
    const leftBoundary = -(breezeConfig.areaWidth / 2);
    // Spawn much further left, completely off-screen
    const startX = leftBoundary - 80 - Math.random() * 60;
    const startY = (Math.random() - 0.5) * breezeConfig.areaHeight;
    const startZ = (Math.random() - 0.5) * breezeConfig.areaDepth;
    
    const streakLength = breezeConfig.minStreakLength + 
                        Math.random() * (breezeConfig.maxStreakLength - breezeConfig.minStreakLength);
    
    // Create simple horizontal wavy lines (not circular)
    const points = [];
    const segments = 50;
    const waveAmplitude = Math.random() * 2 + 0.5; // Random wave height (0.5 to 2.5)
    const waveFrequency = Math.random() * 0.3 + 0.1; // Random wave frequency
    
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = startX + (streakLength * t); // Horizontal progression left to right
        const y = startY + Math.sin(t * Math.PI * 2 * waveFrequency) * waveAmplitude; // Slight wave
        const z = startZ; // Keep depth constant for flat horizontal lines
        points.push(new THREE.Vector3(x, y, z));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const colorChoice = windColors[Math.floor(Math.random() * windColors.length)];
    const material = new THREE.LineBasicMaterial({
        color: colorChoice,
        transparent: true,
        opacity: breezeConfig.minOpacity + 
                Math.random() * (breezeConfig.maxOpacity - breezeConfig.minOpacity),
        linewidth: 1
    });
    
    const line = new THREE.Line(geometry, material);
    
    line.userData = {
        velocityX: breezeConfig.minVelocityX + 
                  Math.random() * (breezeConfig.maxVelocityX - breezeConfig.minVelocityX),
        velocityY: (Math.random() - 0.5) * breezeConfig.turbulenceY,
        velocityZ: (Math.random() - 0.5) * breezeConfig.turbulenceZ,
        streakLength: streakLength,
        originalOpacity: material.opacity,
        wavePhase: Math.random() * Math.PI * 2,
        waveSpeed: 0.02 + Math.random() * 0.025
    };
    
    return line;
}

for (let i = 0; i < windStreakCount; i++) {
    const line = createCurvedWindStreak();
    const positions = line.geometry.attributes.position.array;
    
    // Distribute particles across the entire visible area and beyond
    // This ensures some are visible immediately while others flow in
    const leftBoundary = -(breezeConfig.areaWidth / 2);
    const rightBoundary = (breezeConfig.areaWidth / 2);
    const totalSpread = (rightBoundary - leftBoundary) + 200; // Extended range
    const evenSpacing = (i / windStreakCount) * totalSpread;
    
    // Some particles start on-screen, others off-screen left
    const offsetX = leftBoundary - 50 + evenSpacing;
    
    // Calculate the original starting X position to determine shift amount
    const originalStartX = positions[0];
    const shiftAmount = offsetX - originalStartX;
    
    // Shift ALL points by the same amount to preserve the horizontal streak shape
    for (let j = 0; j < positions.length; j += 3) {
        positions[j] += shiftAmount; // Add to existing X, don't replace it
    }
    line.geometry.attributes.position.needsUpdate = true;
    lines.push(line);
    scene.add(line);
}

function animate() {
    requestAnimationFrame(animate);

    lines.forEach((line, index) => {
        const positions = line.geometry.attributes.position.array;
        const userData = line.userData;
        
        userData.wavePhase += userData.waveSpeed;
        
        let isOutOfBounds = false;
        let minX = Infinity;  // Track leftmost point (entire streak)
        
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += userData.velocityX;
            positions[i + 1] += userData.velocityY + Math.sin(userData.wavePhase + i * 0.1) * 0.02;
            positions[i + 2] += userData.velocityZ + Math.cos(userData.wavePhase + i * 0.1) * 0.02;
            
            if (positions[i] < minX) {
                minX = positions[i];
            }
        }
        
        // Check if entire streak (including head) has passed the right boundary
        const rightBoundary = (breezeConfig.areaWidth / 2) + 50;
        if (minX > rightBoundary) {
            isOutOfBounds = true;
        }
        
        if (isOutOfBounds) {
            // Reset the wind streak far off-screen to the left
            const leftBoundary = -(breezeConfig.areaWidth / 2);
            const resetX = leftBoundary - 80 - Math.random() * 60; // Spawn far off-screen
            
            // Calculate how far to shift all points to move streak back to left
            const shiftAmount = resetX - minX;
            
            for (let i = 0; i < positions.length; i += 3) {
                // Shift all X positions by the same amount to preserve curve shape
                positions[i] += shiftAmount;
            }
            
            // Randomize the velocities for variation
            userData.velocityX = breezeConfig.minVelocityX + 
                                Math.random() * (breezeConfig.maxVelocityX - breezeConfig.minVelocityX);
            userData.velocityY = (Math.random() - 0.5) * breezeConfig.turbulenceY;
            userData.velocityZ = (Math.random() - 0.5) * breezeConfig.turbulenceZ;
            userData.wavePhase = Math.random() * Math.PI * 2;
            userData.waveSpeed = 0.02 + Math.random() * 0.025;
            
            // Randomize opacity for more natural variation
            line.material.opacity = breezeConfig.minOpacity + 
                                   Math.random() * (breezeConfig.maxOpacity - breezeConfig.minOpacity);
            
            line.geometry.attributes.position.needsUpdate = true;
        } else { line.geometry.attributes.position.needsUpdate = true; }
    });

    if (breezeConfig.cameraSwaySpeed > 0) {
        const time = Date.now() * breezeConfig.cameraSwaySpeed;
        camera.position.x = Math.sin(time) * breezeConfig.cameraSwayAmount;
        camera.position.y = Math.cos(time * 1.5) * (breezeConfig.cameraSwayAmount * 0.75);
        camera.lookAt(0, 0, 0);
    }

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) { /* Page is hidden, could pause animation here if needed */ }
});
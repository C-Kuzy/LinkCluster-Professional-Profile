/*
 Author: C-Kuzy
 Description: Tagged with HTML file to deliver an interactive "wind"/"breeze"
              background that "sits" behind all other windows/tables
              
 Customization: Edit breeze-config.js to adjust colors, speed, and appearance!
*/

import breezeConfig from './breeze-config.js';

const container = document.getElementById('breeze-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(breezeConfig.backgroundColor);

const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.2, 1000);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create realistic 'wind streaks' using curved lines
const windStreakCount = breezeConfig.streakCount;
const lines = [];
const windColors = breezeConfig.colors;

function createCurvedWindStreak() {
    // Starting position
    const startX = (Math.random() - 0.5) * breezeConfig.areaWidth;
    const startY = (Math.random() - 0.5) * breezeConfig.areaHeight;
    const startZ = (Math.random() - 0.5) * breezeConfig.areaDepth;
    
    // Wind streak length
    const streakLength = breezeConfig.minStreakLength + 
                        Math.random() * (breezeConfig.maxStreakLength - breezeConfig.minStreakLength);
    
    // Create control points for smooth curve
    const curvePoints = [];
    const segments = 8; // More segments = smoother curve
    
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = startX - (streakLength * t);
        // Add gentle wave-like motion to Y and Z
        const y = startY + Math.sin(t * Math.PI * 2) * (Math.random() * 2 - 1);
        const z = startZ + Math.cos(t * Math.PI * 1.5) * (Math.random() * 1.5 - 0.75);
        curvePoints.push(new THREE.Vector3(x, y, z));
    }
    
    // Create curve from points
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const points = curve.getPoints(50); // Get more points for smooth rendering
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    // Random color from palette with transparency
    const colorChoice = windColors[Math.floor(Math.random() * windColors.length)];
    const material = new THREE.LineBasicMaterial({
        color: colorChoice,
        transparent: true,
        opacity: breezeConfig.minOpacity + 
                Math.random() * (breezeConfig.maxOpacity - breezeConfig.minOpacity),
        linewidth: 1
    });
    
    const line = new THREE.Line(geometry, material);
    
    // Store properties for animation
    line.userData = {
        velocityX: breezeConfig.minVelocityX + 
                  Math.random() * (breezeConfig.maxVelocityX - breezeConfig.minVelocityX),
        velocityY: (Math.random() - 0.5) * breezeConfig.turbulenceY,
        velocityZ: (Math.random() - 0.5) * breezeConfig.turbulenceZ,
        streakLength: streakLength,
        originalOpacity: material.opacity,
        wavePhase: Math.random() * Math.PI * 2, // Random starting phase for wave
        waveSpeed: 0.02 + Math.random() * 0.03  // Random wave animation speed
    };
    
    return line;
}

for (let i = 0; i < windStreakCount; i++) {
    const line = createCurvedWindStreak();
    lines.push(line);
    scene.add(line);
}

/*
 --- Color Palette Reference ---
 
 Neutral & Digital Greys:
 0x222226, 0x44475a, 0x2d2d2d, 0x3a3f4b
 
 Blues & Teals:
 0x334455, 0x2980b9, 0x66ccff, 0x00ffd0, 0x2c3e4f
 
 Purples & Magentas:
 0x3a2e4f, 0x8e44ad, 0x9b59b6, 0xff2d55
 
 Accent Variations:
 0xffc300, 0xfffafa, 0xffffff, 0xff6f61, 0x00ffea, 0x00ff99, 0x00b894
*/

function animate() {
    requestAnimationFrame(animate);

    // Animate each wind streak
    lines.forEach((line, index) => {
        const positions = line.geometry.attributes.position.array;
        const userData = line.userData;
        
        // Update wave phase for flowing effect
        userData.wavePhase += userData.waveSpeed;
        
        // Move all points of the curved line
        let isOutOfBounds = false;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += userData.velocityX;     // x
            positions[i + 1] += userData.velocityY + Math.sin(userData.wavePhase + i * 0.1) * 0.02; // y with wave
            positions[i + 2] += userData.velocityZ + Math.cos(userData.wavePhase + i * 0.1) * 0.02; // z with wave
            
            // Check if first point is out of bounds
            if (i === 0 && positions[i] > breezeConfig.areaWidth / 2) {
                isOutOfBounds = true;
            }
        }
        
        // Reset wind streak if it goes out of bounds
        if (isOutOfBounds) {
            // Remove old line and create new one
            scene.remove(line);
            const newLine = createCurvedWindStreak();
            lines[index] = newLine;
            scene.add(newLine);
        } else {
            line.geometry.attributes.position.needsUpdate = true;
        }
    });

    // Subtle camera sway for depth perception
    if (breezeConfig.cameraSwaySpeed > 0) {
        camera.position.x = Math.sin(Date.now() * breezeConfig.cameraSwaySpeed) * breezeConfig.cameraSwayAmount;
        camera.position.y = Math.cos(Date.now() * breezeConfig.cameraSwaySpeed * 1.5) * (breezeConfig.cameraSwayAmount * 0.75);
        camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
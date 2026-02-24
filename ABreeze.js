/*
 Author: C-Kuzy
 Description: Tagged with HTML file to deliver an interactive "wind"/"breeze"
              background that "sits" behind all other windows/tables
*/

const container = document.getElementById('breeze-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create 'breeze' particles
const particleCount = 3500;
const geometry = new THREE.BufferGeometry();
const positions = [];
const velocities = [];

for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 200;
    positions.push(x, y, z);
    velocities.push(
        0.2 + Math.random() * 0.05, // x velocity (breeze direction)
        (Math.random() - 0.5) * 0.15, // y velocity (turbulence)
        (Math.random() - 0.5) * 0.05  // z velocity (turbulence)
    );
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

/*
 --- Neutral & Digital Greys ---
0x222226, // Dark grey
0x44475a, // Soft dark blue-grey
0x2d2d2d, // Charcoal grey
0x3a3f4b, // Slate grey

 --- Blues & Teals ---
0x334455, // Blue-grey
0x2980b9, // Electric blue (Spider-Verse)
0x66ccff, // Light blue
0x00ffd0, // Neon teal
0x2c3e4f, // Teal-grey

 --- Purples & Magentas ---
0x3a2e4f, // Purple-grey
0x8e44ad, // Deep magenta (Spider-Verse)
0x9b59b6, // Soft purple
0xff2d55, // Hot pink (Spider-Verse accent)

 --- Accent Variation ---
0xffc300, // Vivid yellow (Spider-Verse accent)
0xfffafa, // Off-white
0xffffff, // White (for sparkle/highlight)
0xff6f61, // Coral
0x00ffea, // Aqua
0x00ff99, // Mint green
0x00b894, // Green-teal
*/

const material = new THREE.PointsMaterial({
    color: 0xff2d55,
    size: 0.2,
    innerWidth: 25,
    transparent: true,
    opacity: 0.5
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animate() {
    requestAnimationFrame(animate);

    const positions = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];     // x
        positions[i * 3 + 1] += velocities[i * 3 + 1]; // y
        positions[i * 3 + 2] += velocities[i * 3 + 2]; // z

        // Reset particle if it goes out of bounds
        if (positions[i * 3] > 100) {
            positions[i * 3] = -100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        }
    }
    geometry.attributes.position.needsUpdate = true;

    // Optional: rotate the whole system for a 3D effect
    particles.rotation.y += 0.0000000001;
    particles.rotation.x += 0.0000000001;
    particles.rotation.z += 0.0000000001;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
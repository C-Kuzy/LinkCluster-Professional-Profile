/*
 Author: C-Kuzy
 Description: Configuration file for ABreeze.js wind animation
              Adjust these values to customize the wind effect!
*/

export const breezeConfig = {
    // Wind Streak Appearance
    streakCount: 800,           // Number of wind streaks (higher = denser)
    minStreakLength: 3,         // Minimum length of wind streaks
    maxStreakLength: 12,        // Maximum length of wind streaks
    
    // Animation Speed
    minVelocityX: 0.3,          // Minimum horizontal wind speed
    maxVelocityX: 0.7,          // Maximum horizontal wind speed
    turbulenceY: 0.2,           // Vertical turbulence (0 = none)
    turbulenceZ: 0.1,           // Depth turbulence (0 = none)
    
    // Visual Properties
    minOpacity: 0.3,            // Minimum transparency
    maxOpacity: 0.7,            // Maximum transparency
    
    // Area Coverage
    areaWidth: 250,             // Horizontal spread
    areaHeight: 150,            // Vertical spread
    areaDepth: 250,             // Depth spread
    
    // Camera Movement
    cameraSwaySpeed: 0.0001,    // Speed of subtle camera movement (0 = none)
    cameraSwayAmount: 2,        // Amount of camera sway
    
    // Color Palette (Spider-Verse inspired)
    colors: [
        0xff2d55,  // Hot pink
        0x8e44ad,  // Deep magenta
        0x2980b9,  // Electric blue
        0x2d2d2d,  // Neon teal 0x00ffd0
        0x3a3f4b,  // Soft purple 0x9b59b6
        // Add more colors here! Format: 0xRRGGBB
    ],
    
    // Background
    backgroundColor: 0x000000   // Black background
};

export default breezeConfig;

/*
 Author: C-Kuzy
 Description: Configuration file for ABreeze.js wind animation
              Adjust these values to customize the wind effect!
*/

export const breezeConfig = {
    // Wind Streak Appearance
    streakCount: 2000,          // Number of wind streaks (higher = denser)
                                // Note: Auto-reduced to 50% on mobile, 75% on tablet for performance
    minStreakLength: 5,         // Minimum length of wind streaks (increased)
    maxStreakLength: 18,        // Maximum length of wind streaks (increased)
    
    // Animation Speed
    minVelocityX: 0.2,          // Minimum horizontal wind speed (slowed for visibility)
    maxVelocityX: 0.5,          // Maximum horizontal wind speed (slowed for visibility)
    turbulenceY: 0.3,           // Vertical turbulence (increased)
    turbulenceZ: 0.2,           // Depth turbulence (increased)
    
    // Visual Properties
    minOpacity: 0.4,            // Minimum transparency
    maxOpacity: 0.8,            // Maximum transparency (increased for visibility)
    
    // Area Coverage
    areaWidth: 300,             // Horizontal spread (increased)
    areaHeight: 200,            // Vertical spread (increased)
    areaDepth: 300,             // Depth spread (increased)
    
    // Camera Movement
    cameraSwaySpeed: 0.0001,    // Speed of subtle camera movement (0 = none)
    cameraSwayAmount: 2,        // Amount of camera sway
    
    // Color Palette (Spider-Verse inspired) - BRIGHT colors visible on black!
    colors: [
        0xff2d55,  // Hot pink
        0x8e44ad,  // Deep magenta
        0x2980b9,  // Electric blue
        0x00ffd0,  // Neon teal (restored - was dark gray!)
        0x9b59b6,  // Soft purple (restored - was dark gray!)
        0x66ccff,  // Light blue
        0xff6f61,  // Coral
        // Add more colors here! Format: 0xRRGGBB
    ],
    
    // Background
    backgroundColor: 0x000000   // Black background
};

export default breezeConfig;
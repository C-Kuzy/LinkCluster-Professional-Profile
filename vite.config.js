import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path
  base: './',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    
    // Enable minification
    minify: 'terser',
    
    // Terser options for aggressive minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: true, // Mangle variable names
      format: {
        comments: false, // Remove all comments
      },
    },
    
    // Generate sourcemaps for debugging (but not inline)
    sourcemap: false,
    
    // Chunk splitting strategy
    rollupOptions: {
      output: {
        // Content-based hashing for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        // Manual chunk splitting for better caching
        manualChunks: {
          'three': ['three'],
          'vendor': ['breeze-config.js'],
        },
      },
    },
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Asset inline threshold (smaller assets will be inlined as base64)
    assetsInlineLimit: 4096,
    
    // Clear output directory before building
    emptyOutDir: true,
  },
  
  // Server configuration for local development
  server: {
    port: 3000,
    open: true,
  },
  
  // Preview configuration
  preview: {
    port: 8080,
  },
});

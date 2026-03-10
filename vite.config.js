import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readdirSync } from 'fs';

export default defineConfig({
  // Base public path
  base: './',
  
  // Set public directory to false since we're managing assets manually
  publicDir: false,
  
  // Build configuration
  build: {
    outDir: 'dist',
    designDir: 'design',
    
    // Enable minification
    minify: 'terser',
    
    // Terser options for aggressive minification & security
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        toplevel: true, // Mangle top-level variable names
        keep_classnames: false,
        keep_fnames: false,
      },
      format: {
        comments: false, // Strip all comments
      },
    },
    
    // No sourcemaps in production for security
    sourcemap: false,
    
    // Rollup configuration with entry point and output options
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'KzyINdex.html')
      },
      output: {
        // Content-based hashing for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('three')) {
            return 'three';
          }
        },
      },
      plugins: [
        {
          name: 'rename-index',
          generateBundle(options, bundle) {
            // Rename KzyINdex.html to index.html for Vercel
            const indexHtml = bundle['KzyINdex.html'];
            if (indexHtml) {
              indexHtml.fileName = 'index.html';
            }
          }
        },
        {
          name: 'copy-lib-assets',
          writeBundle() {
            // Copy lib/assets to dist/lib/assets after build
            const srcDir = resolve(__dirname, 'lib/assets');
            const destDir = resolve(__dirname, 'dist/lib/assets');
            
            try {
              mkdirSync(destDir, { recursive: true });
              const files = readdirSync(srcDir);
              files.forEach(file => {
                if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg')) {
                  copyFileSync(resolve(srcDir, file), resolve(destDir, file));
                }
              });
              console.log('✓ Copied lib/assets to dist/lib/assets');
            } catch (err) {
              console.error('Error copying assets:', err);
            }
          }
        }
      ]
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

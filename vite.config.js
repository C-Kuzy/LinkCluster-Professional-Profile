import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs';

export default defineConfig({
  // Base public path
  base: './',
  
  // Set public directory to false since we're managing assets manually
  publicDir: false,
  
  // Build configuration
  build: {
    outDir: 'dist',
    
    // Enable minification
    minify: 'terser',
    
    // Terser options for aggressive minification & security
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better compression
        unsafe: false, // Disable unsafe optimizations for safety
      },
      mangle: {
        toplevel: true, // Mangle top-level variable names
        keep_classnames: false,
        keep_fnames: false,
        safari10: true, // Safari 10 compatibility
      },
      format: {
        comments: false, // Strip all comments
        ascii_only: true, // Escape Unicode characters for better compatibility
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
            if (id.includes('three')) {
              return 'three';
            }
            return 'vendor';
          }
        },
      },
      plugins: [
        {
          name: 'rename-index',
          generateBundle(options, bundle) {
            // Rename KzyINdex.html to index.html for deployment
            const indexHtml = bundle['KzyINdex.html'];
            if (indexHtml) {
              indexHtml.fileName = 'index.html';
            }
          }
        },
        {
          name: 'copy-lib-resources',
          writeBundle() {
            const copyDirs = [
              { src: 'lib/assets', dest: 'dist/lib/assets' },
              { src: 'lib/data', dest: 'dist/lib/data' },
            ];
            
            copyDirs.forEach(({ src, dest }) => {
              const srcDir = resolve(__dirname, src);
              const destDir = resolve(__dirname, dest);
              
              if (!existsSync(srcDir)) {
                console.warn(`⚠ Source directory not found: ${src}`);
                return;
              }
              
              try {
                mkdirSync(destDir, { recursive: true });
                const files = readdirSync(srcDir);
                
                files.forEach(file => {
                  const srcFile = resolve(srcDir, file);
                  const destFile = resolve(destDir, file);
                  
                  // Copy specific file types
                  if (file.match(/\.(png|jpg|jpeg|svg|webp|gif|html|js)$/i)) {
                    copyFileSync(srcFile, destFile);
                  }
                });
                
                console.log(`✓ Copied ${src} to ${dest}`);
              } catch (err) {
                console.error(`Error copying ${src}:`, err);
              }
            });
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
    
    // Target modern browsers for better optimization
    target: 'es2020',
    
    // Chunk size warnings
    chunkSizeWarningLimit: 600,
  },
  
  // Server configuration for local development
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    host: 'localhost',
  },
  
  // Preview configuration
  preview: {
    port: 8080,
    strictPort: true,
    host: 'localhost',
  },
});

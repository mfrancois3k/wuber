import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: 'esbuild',
    sourcemap: true,
    terserOptions: {
      compress: {
        ecma: 2015,
        warnings: false,
        comparisons: false,
        inline: 2
      },
      mangle: {
        safari10: true
      }
    }
  },
})

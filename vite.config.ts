import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: 'src/app.tsx',
      name: 'my-lib',
      formats: ['umd']
    },
    rollupOptions: {
      output: {
        globals: {
          // '@emotion/react': 'emotionReact',
          preact: 'preact'
        }
      },
      external: [
        // '@emotion/react',
        'preact'
      ]
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
})

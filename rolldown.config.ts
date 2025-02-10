import { defineConfig } from 'rolldown'

export default defineConfig({
  input: 'src/main.tsx',
  output: {
    file: 'dist/bundle.js',
  },
})

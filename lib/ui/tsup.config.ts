import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: ['src/index.css'],
  format: ['esm'],
  ...options
}))

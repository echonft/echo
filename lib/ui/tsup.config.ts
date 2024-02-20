import { defineConfig, type Options } from 'tsup'

// noinspection JSUnusedGlobalSymbols
export default defineConfig((options: Options) => ({
  entry: ['src/index.css'],
  format: ['esm'],
  ...options
}))

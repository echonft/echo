import { defineConfig, Options } from 'tsup'

const isProd = process.env.NODE_ENV === 'production'
export default defineConfig((options: Options) => ({
  treeshake: isProd,
  splitting: isProd,
  entry: ['src/index.ts'],
  format: ['esm'],
  minify: isProd,
  clean: true,
  ...options
}))

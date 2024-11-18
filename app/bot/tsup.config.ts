import { defineConfig, type Options } from 'tsup'

// noinspection JSUnusedGlobalSymbols
export default defineConfig((options: Options) => ({
  clean: true,
  entry: ['src/index.ts'],
  format: 'esm',
  inject: ['src/cjs-shim.ts'],
  minify: true,
  splitting: false,
  platform: 'node',
  shims: true,
  sourcemap: true,
  target: 'esnext',
  ...options
}))

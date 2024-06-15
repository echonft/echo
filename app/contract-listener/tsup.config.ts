import { defineConfig, type Options } from 'tsup'

// noinspection JSUnusedGlobalSymbols
export default defineConfig((options: Options) => ({
  // bundle: false,
  clean: true,
  entry: ['src/index.ts'],
  format: 'esm',
  inject: ['src/cjs-shim.ts'],
  minify: true,
  platform: 'node',
  shims: true,
  splitting: true,
  // skipNodeModulesBundle: false,
  sourcemap: true,
  target: 'esnext',
  ...options
}))

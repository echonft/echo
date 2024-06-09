import { defineConfig, type Options } from 'tsup'

// noinspection JSUnusedGlobalSymbols
export default defineConfig((options: Options) => ({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  format: 'esm',
  inject: ['src/cjs-shim.ts'],
  minify: false,
  platform: 'node',
  replaceNodeEnv: false,
  shims: true,
  skipNodeModulesBundle: false,
  splitting: false,
  sourcemap: true,
  target: 'esnext',
  ...options
}))

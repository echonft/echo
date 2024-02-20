import { defineConfig, type Options } from 'tsup'

// noinspection JSUnusedGlobalSymbols
export default defineConfig((options: Options) => ({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  platform: 'node',
  target: 'esnext',
  format: 'cjs',
  skipNodeModulesBundle: false,
  sourcemap: true,
  ...options
}))

import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  platform: 'node',
  target: 'es6',
  format: 'cjs',
  skipNodeModulesBundle: false,
  sourcemap: true,
  ...options
}))

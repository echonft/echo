import { defineConfig, type Options } from 'tsup'

export default defineConfig((options: Options) => ({
  bundle: true,
  clean: true,
  entry: ['src/index.ts'],
  target: 'esnext',
  platform: 'node',
  skipNodeModulesBundle: false,
  sourcemap: true,
  ...options
}))

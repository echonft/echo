import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: ['src/index.ts', 'src/types/index.ts', 'src/config/api-routes.ts', 'src/config/get-api-route-url.ts'],
  format: ['esm'],
  dts: true,
  minify: true,
  clean: true,
  ...options
}))

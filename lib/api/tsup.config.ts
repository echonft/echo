import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
  treeshake: true,
  splitting: true,
  entry: [
    'src/index.ts',
    'src/types/index.ts',
    'src/routes/constants/api-routes.ts',
    'src/routes/utils/get-api-route-url.ts'
  ],
  format: ['esm'],
  dts: true,
  minify: true,
  clean: true,
  ...options
}))

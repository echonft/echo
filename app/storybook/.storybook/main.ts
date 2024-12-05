import { type StorybookConfig } from '@storybook/nextjs'
import path, { dirname, join } from 'path'

const config: StorybookConfig = {
  addons: [
    { name: '@storybook/addon-essentials', options: { docs: false } },
    getAbsolutePath('@storybook/addon-webpack5-compiler-swc')
  ],
  core: {
    disableWhatsNewNotifications: true
  },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: 'localhost:6006'
  }),
  framework: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      builder: {},
      nextConfigPath: path.resolve(__dirname, '../../frontend/next.config.js')
    }
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    },
    minify: false
  }),
  staticDirs: ['../public'],
  stories: ['../src/**/*stories.tsx'],
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}
export default config

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}

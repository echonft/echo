import { type StorybookConfig } from '@storybook/nextjs'
import path, { dirname, join } from 'path'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  stories: ['../src/**/*stories.tsx'],
  addons: [
    { name: '@storybook/addon-essentials', options: { docs: false } },
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {}
              }
            ]
          }
        ]
      }
    }
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      builder: {
        useSWC: true
      },
      image: {
        unoptimized: true
      },
      nextConfigPath: path.resolve(__dirname, '../../frontend/next.config.js')
    }
  },
  env: (config) => ({
    ...config,
    GOOGLE_STORAGE_BUCKET: 'echo-dev-public',
    NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL
  }),
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic'
        }
      }
    }
  }),
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [new TsconfigPathsPlugin()]
      }
    }
  }
}
export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

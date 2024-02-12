import { type StorybookConfig } from '@storybook/nextjs'
import { dirname, join } from 'path'
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
      }
    }
  },

  env: (config) => ({
    ...config,
    NEXT_PUBLIC_VERCEL_URL: 'localhost:6006'
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

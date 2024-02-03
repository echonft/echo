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
    },
    { name: '@storybook/addon-actions' }
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
    NEXT_PUBLIC_ALCHEMY_KEY: 'test',
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: 'wallet-connect-project-id',
    VERCEL_URL: 'http://localhost:6006/'
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
        plugins: [new TsconfigPathsPlugin()],
        fallback: {
          ...config.resolve!.fallback,
          constants: false,
          crypto: false,
          http: false,
          https: false,
          os: false,
          path: false,
          stream: false,
          tls: false,
          zlib: false
        }
      }
    }
  }
}
export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

import { type StorybookConfig } from '@storybook/react-webpack5'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  stories: ['../src/**/*stories.tsx'],
  addons: [{ name: '@storybook/addon-essentials', options: { docs: false } }],
  framework: {
    name: '@storybook/react-webpack5',
    options: { builder: { useSWC: true } }
  },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_ALCHEMY_KEY: 'test',
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: 'wallet-connect-project-id'
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

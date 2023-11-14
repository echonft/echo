import { type StorybookConfig } from '@storybook/react-webpack5'
import { dirname, join } from 'path'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: ['../src/**/*stories.tsx'],
  babel: async (options) => {
    options.presets.push('@babel/preset-typescript')
    return options
  },
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions')
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_ALCHEMY_KEY: 'test',
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: 'wallet-connect-project-id'
  }),
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [new TsconfigPathsPlugin()],
        fallback: {
          ...config.resolve.fallback,
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

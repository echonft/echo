import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../src/**/*stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          constants: require.resolve('constants-browserify'),
          crypto: require.resolve('crypto-browserify'),
          path: require.resolve('path-browserify'),
          stream: require.resolve('stream-browserify'),
          zlib: require.resolve('browserify-zlib')
        }
      }
    }
  },
  env: (config) => ({
    ...config,
    ALCHEMY_API_KEY: process.env.STORYBOOK_ALCHEMY_API_KEY
  })
}

export default config

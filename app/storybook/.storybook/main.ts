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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: getAbsolutePath('@storybook/nextjs'),
    options: {
      builder: {},
      image: {
        unoptimized: true
      },
      nextConfigPath: path.resolve(__dirname, '../../frontend/next.config.js')
    }
  },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_VERCEL_URL: 'localhost:6006',
    NEXT_PUBLIC_IS_TESTNET: '1'
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
  webpackFinal: (config) => {
    return {
      ...config,
      optimization: {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 30 * 1024,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true
            },
            vendorPreview: {
              test: /[\\/]node_modules[\\/]/,
              priority: -20,
              reuseExistingChunk: true
            },
            default: {
              minChunks: 2,
              priority: -30,
              reuseExistingChunk: true
            }
          },
          maxSize: 244 * 1024
        }
      },
      performance: {
        ...config.performance,
        maxAssetSize: 244 * 1024
      },
      resolve: {
        ...config.resolve,
        plugins: [new TsconfigPathsPlugin()]
      }
    }
  }
}
export default config

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')))
}

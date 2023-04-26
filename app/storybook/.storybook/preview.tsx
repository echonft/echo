import type { Preview } from '@storybook/react'
import '@echo/ui/dist/index.css'
import * as NextImage from 'next/image'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  // @ts-ignore
  value: (props) => <OriginalNextImage {...props} unoptimized />
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview

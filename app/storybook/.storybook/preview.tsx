import { DependenciesProvider, getMessages } from '@echo/ui'
import type { Preview } from '@storybook/react'
import '@echo/ui/dist/index.css'
import * as NextImage from 'next/image'
import { NextIntlProvider } from 'next-intl'

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

export const decorators = [
  (Story) => {
    return (
      // @ts-ignore
      <DependenciesProvider linkProvider={{ getLink: (_route, _params) => '#' }}>
        {/*@ts-ignore*/}
        <NextIntlProvider messages={getMessages('en')} locale={'en'}>
          {Story()}
        </NextIntlProvider>
      </DependenciesProvider>
    )
  }
]

export default preview

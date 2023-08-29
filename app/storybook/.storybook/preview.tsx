import { DependenciesProvider, getMessages } from '@echo/ui'
import '@echo/ui/dist/index.css'
import type { Preview } from '@storybook/react'
import { NextIntlProvider } from 'next-intl'
import { apiProvider } from '../src/mocks/api-provider'

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
      <DependenciesProvider linkProvider={{ getLink: (_route, _params) => '/nfts' }} apiProvider={apiProvider}>
        {/*@ts-ignore*/}
        <NextIntlProvider messages={getMessages('en')} locale={'en'}>
          {Story()}
        </NextIntlProvider>
      </DependenciesProvider>
    )
  }
]

export default preview

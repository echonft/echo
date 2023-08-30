import { DependenciesProvider, messages } from '@echo/ui'
import '@echo/ui/dist/index.css'
import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl'
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
        <NextIntlClientProvider messages={messages} locale={'en'}>
          {Story()}
        </NextIntlClientProvider>
      </DependenciesProvider>
    )
  }
]

export default preview

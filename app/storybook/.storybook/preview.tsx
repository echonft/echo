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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (Story) => {
    return (
      <DependenciesProvider apiProvider={apiProvider}>
        <NextIntlClientProvider messages={messages} locale={'en'}>
          {Story()}
        </NextIntlClientProvider>
      </DependenciesProvider>
    )
  }
]

export default preview

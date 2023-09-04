import { messages } from '@echo/ui'
import '@echo/ui/dist/index.css'
import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl'

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
      <NextIntlClientProvider messages={messages} locale={'en'}>
        {Story()}
      </NextIntlClientProvider>
    )
  }
]

export default preview

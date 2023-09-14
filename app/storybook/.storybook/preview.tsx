import '@echo/ui-css/index.css'
import { messages } from '@echo/ui/messages/en'
import type { Preview } from '@storybook/react'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { NextIntlClientProvider } from 'next-intl'

dayjs.extend(RelativeTime)

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

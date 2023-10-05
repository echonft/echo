import '@echo/ui-css/index.css'
import { messages } from '@echo/ui/messages/en'
import { getAuthUser } from '@mocks/model/auth-user'
import type { Preview } from '@storybook/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'

dayjs.extend(relativeTime)

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
        <SessionProvider session={{ user: getAuthUser(), expires: 'never' }}>{Story()}</SessionProvider>
      </NextIntlClientProvider>
    )
  }
]

export default preview

import { messages } from '@echo/ui/messages/en'
import { getRequestConfig } from 'next-intl/server'

const i18n = getRequestConfig(() => ({
  locale: 'en',
  messages,
  timeZone: 'America/New_York'
}))

export default i18n

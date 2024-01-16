import { messages } from '@echo/ui/messages/en'
import { getRequestConfig } from 'next-intl/server'

const i18n = getRequestConfig(() => ({
  messages,
  timeZone: 'America/New_York'
})) as unknown

export default i18n

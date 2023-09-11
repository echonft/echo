import { messages } from '@echo/ui/src/messages/en'
import { getRequestConfig } from 'next-intl/server'

const i18n = getRequestConfig(() => ({
  messages
})) as unknown

export default i18n

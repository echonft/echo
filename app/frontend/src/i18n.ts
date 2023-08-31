import { messages } from '@echo/ui'
import { getRequestConfig } from 'next-intl/server'

const i18n = getRequestConfig(() => ({
  messages
}))

export default i18n

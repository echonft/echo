import { messages } from '@echo/ui/messages/en'
import { createTranslator } from 'next-intl'

// Note: we're not gonna get message types with this because TS complains about the type
// so make sure the key is valid
export function getTranslator() {
  return createTranslator({ locale: 'en', messages }) as (key: string, params?: object) => string
}

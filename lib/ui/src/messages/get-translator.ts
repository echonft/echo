import { messages } from './en'
import { createTranslator } from 'next-intl'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function getTranslator() {
  return createTranslator({ locale: 'en', messages })
}

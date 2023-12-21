import { messages } from '@echo/bot/messages/en'

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translation: typeof messages
    }
  }
}

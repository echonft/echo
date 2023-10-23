import { messages } from '@echo/bot/messages/en'

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      APP_URL: string
    }
  }
}
declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translation: typeof messages
    }
  }
}

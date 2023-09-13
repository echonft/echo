import { MessagesType } from '@echo/ui/types/messages'

export declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}

  namespace NodeJS {
    interface ProcessEnv extends Dict<string> {
      NODE_ENV: 'production' | 'development' | 'test' | 'mock'
    }
  }
}

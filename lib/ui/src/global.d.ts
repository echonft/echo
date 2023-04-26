import { MessagesType } from './types/messages'

export declare global {
  // get typings on translation keys
  interface IntlMessages extends MessagesType {}
}

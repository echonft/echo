import { messages } from '@lib/messages/en'

export type MessagesType = typeof messages

// TODO change this if we ever support more locals
export function getMessages(_locale: string | undefined, _defaultLocale: string | undefined): MessagesType {
  return messages
}

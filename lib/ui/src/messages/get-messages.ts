import { MessagesType } from '../types/messages'
import { messages } from './en'

export const getMessages = (_locale: string | undefined): MessagesType => messages

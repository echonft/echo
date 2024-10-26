import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { User } from '@echo/model/types/user'
import { dissoc, modify } from 'ramda'

export function userDocumentToModel(user: UserDocument): User {
  return modify<'discord', UserDocument['discord'], User['discord']>('discord', dissoc('id'))(user)
}

import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { User } from '@echo/model/types/user'
import { dissoc, modify } from 'ramda'

export function userDocumentToModel<T extends UserDocument | (UserDocument & Required<Pick<UserDocument, 'wallet'>>)>(
  document: T
): T extends UserDocument & Required<Pick<UserDocument, 'wallet'>> ? User & Required<Pick<User, 'wallet'>> : User {
  return modify<'discord', UserDocument['discord'], User['discord']>(
    'discord',
    dissoc('id')
  )(document) as T extends UserDocument & Required<Pick<UserDocument, 'wallet'>>
    ? User & Required<Pick<User, 'wallet'>>
    : User
}

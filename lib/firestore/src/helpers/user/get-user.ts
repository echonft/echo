import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { type User } from '@echo/model/types/user'
import { type Wallet } from '@echo/model/types/wallet'
import { assoc, modify, pick, pipe } from 'ramda'

export function getUser(user: UserDocumentData, wallet: Wallet): User {
  return pipe<
    [UserDocumentData],
    Pick<UserDocumentData, 'username' | 'discord'>,
    Pick<User, 'username' | 'discord'>,
    User
  >(
    pick(['username', 'discord']),
    modify<'discord', UserDocumentData['discord'], User['discord']>('discord', pick(['avatarUrl', 'username'])),
    assoc('wallet', wallet)
  )(user)
}

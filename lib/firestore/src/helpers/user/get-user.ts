import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { assoc, modify, pick, pipe } from 'ramda'

export function getUser(user: UserDocumentData, wallet: Wallet): User {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pick(['username', 'discord']),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('discord', pick(['avatarUrl', 'username'])),
    assoc('wallet', wallet)
  )(user) as User
}

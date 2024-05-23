import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { DiscordProfile } from '@echo/model/types/discord-profile'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, path, pick, pipe, prop } from 'ramda'

interface MapUserDocumentDataToUserArgs {
  user: UserDocumentData
  wallet: Wallet
}
export function mapUserDocumentDataToUser(args: MapUserDocumentDataToUserArgs): User {
  return applySpec<User>({
    username: path(['user', 'username']),
    discord: pipe<[MapUserDocumentDataToUserArgs], DiscordProfile, Pick<DiscordProfile, 'avatarUrl' | 'username'>>(
      nonNullableReturn(path(['user', 'discord'])),
      pick(['username', 'avatarUrl'])
    ),
    wallet: prop('wallet')
  })(args)
}

import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { UserDiscordGuild } from '@echo/firestore-types'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

export interface NewUser {
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: UserDiscordGuild[]
  discordId: string
  discordUsername: string
}

export async function addUser(user: NewUser): Promise<string> {
  const reference = firestore().collection(CollectionName.USERS).doc()
  const id = reference.id
  const newUser = pipe(
    assoc('id', id),
    assoc('nonce', undefined),
    assoc('nftsUpdatedAt', dayjs()),
    assoc('updatedAt', dayjs()),
    assoc('wallets', [])
  )(user)
  await reference.set(userDataConverter.toFirestore(newUser))
  return id
}

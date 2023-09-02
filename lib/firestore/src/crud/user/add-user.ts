import { CollectionName } from '../../constants/collection-name'
import { userDataConverter } from '../../converters/user-data-converter'
import { firestore } from '../../services/firestore'
import { UserDiscordGuild } from '../../types/model/user-discord-guild'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

export interface NewUser {
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuilds: UserDiscordGuild[]
  discordId: string
  discordUsername: string
}

export const addUser = async (user: NewUser): Promise<string> => {
  const reference = firestore().collection(CollectionName.USERS).doc()
  const id = reference.id
  const newUser = pipe(
    assoc('id', id),
    assoc('nonce', undefined),
    assoc('nftsUpdatedAt', dayjs()),
    assoc('updatedAt', dayjs()),
    assoc('wallets', [])
  )(user)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await reference.set(userDataConverter.toFirestore(newUser))
  return id
}

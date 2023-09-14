import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDataConverter } from '@echo/firestore/converters/user-data-converter'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

export interface NewUser {
  discordAvatar?: string
  discordBanner?: string
  discordGuilds: FirestoreUserDiscordGuild[]
  discordId: string
  discordUsername: string
  username: string
}

export async function addUser(user: NewUser): Promise<string> {
  const reference = firestoreApp().collection(CollectionName.USERS).doc()
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

import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user/discord-user-data-converter'
import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import dayjs from 'dayjs'
import { assoc, isNil, pipe } from 'ramda'

export interface NewFirestoreDiscordUser {
  discordAvatar?: string
  discordBanner?: string
  discordId: string
  discordUsername: string
}

export async function addDiscordUser(userId: string, newDiscordUser: NewFirestoreDiscordUser): Promise<string> {
  const discordUser = await findDiscordUserByUserId(userId)
  if (!isNil(discordUser)) {
    throw Error(`trying to add discord user with userId ${userId} while it already exists`)
  }
  const user = await findUserById(userId)
  if (isNil(user)) {
    throw Error(`trying to add discord user with userId ${userId} but this user does not exist`)
  }
  const reference = firestoreApp().collection(CollectionName.DISCORD_USERS).doc()
  const id = reference.id
  const newUser = pipe(assoc('id', id), assoc('updatedAt', dayjs()), assoc('userId', userId))(newDiscordUser)
  await reference.set(discordUserDataConverter.toFirestore(newUser))
  return id
}

import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDiscordGuildDataConverter } from '@echo/firestore/converters/user-discord-guild-data-converter'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { findUserDiscordGuildByUserId } from '@echo/firestore/crud/user-discord-guild/find-user-discord-guild-by-user-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import dayjs from 'dayjs'
import { assoc, isNil, pipe } from 'ramda'

export interface NewFirestoreUserDiscordGuild {
  guilds: { discordId: string }[]
}

export async function addUserDiscordGuild(
  userId: string,
  newUserDiscordGuild: NewFirestoreUserDiscordGuild
): Promise<string> {
  const userDiscordGuild = await findUserDiscordGuildByUserId(userId)
  if (!isNil(userDiscordGuild)) {
    throw Error(`trying to add user discord guild with userId ${userId} while it already exists`)
  }
  const user = await findUserById(userId)
  if (isNil(user)) {
    throw Error(`trying to add user discord guild with userId ${userId} but this user does not exist`)
  }
  const reference = firestoreApp().collection(CollectionName.USER_DISCORD_GUILDS).doc()
  const id = reference.id
  const guilds = pipe(assoc('id', id), assoc('updatedAt', dayjs()), assoc('userId', userId))(newUserDiscordGuild)
  await reference.set(userDiscordGuildDataConverter.toFirestore(guilds))
  return id
}

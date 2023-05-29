import { FirestoreDiscordGuildData, FirestoreUserData } from '@echo/firestore'
import { userIsInGuildWithId } from '@echo/model'
import { map, prop } from 'ramda'

export function userIsInGuild(user: FirestoreUserData, discordGuild: FirestoreDiscordGuildData) {
  return userIsInGuildWithId(
    map<FirestoreDiscordGuildData, string>(prop('discordId'), user.discordGuilds ?? []),
    discordGuild.discordId
  )
}

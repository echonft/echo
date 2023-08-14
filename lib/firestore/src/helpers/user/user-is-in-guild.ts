import { FirestoreDiscordGuildData } from '../../types/model/data/discord-guild/firestore-discord-guild-data'
import { FirestoreUserData } from '../../types/model/data/user/firestore-user-data'
import { includes } from 'ramda'

export const userIsInGuild = (user: FirestoreUserData, discordGuild: FirestoreDiscordGuildData) =>
  includes(discordGuild, user.discordGuilds ?? [])

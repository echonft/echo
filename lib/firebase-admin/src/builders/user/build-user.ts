import { getFirestoreDiscordGuildRefsByDiscordIds } from '../../data/discord-guild/get-firestore-discord-guild-refs-by-discord-ids'
import { FirestoreUserPrototype } from '../../types'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreUser } from '@echo/firestore'

export const buildUser: FirestoreBuilder<FirestoreUserPrototype, FirestoreUser> = async (prototype) =>
  ({
    discordId: prototype.discordId,
    discordUsername: prototype.discordUsername,
    discordAvatar: prototype.discordAvatar,
    discordBanner: prototype.discordBanner,
    discordGuilds: await getFirestoreDiscordGuildRefsByDiscordIds(prototype.discordGuildIds)
  } as FirestoreUser)

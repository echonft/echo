import { getFirestoreDiscordGuildRefsByDiscordIds } from '../../data/discord-guild/get-firestore-discord-guild-refs-by-discord-ids'
import { FirestoreBuilder, FirestoreUser, FirestoreUserPrototype } from '@echo/firestore'

// TODO Fix typing, admin does not have the same type as firestore...
export const buildUser: FirestoreBuilder<FirestoreUserPrototype, FirestoreUser> = async (prototype) =>
  ({
    discordId: prototype.discordId,
    discordUsername: prototype.discordUsername,
    discordAvatar: prototype.discordAvatar,
    discordBanner: prototype.discordBanner,
    discordGuilds: await getFirestoreDiscordGuildRefsByDiscordIds(prototype.discordGuildIds)
  } as unknown as FirestoreUser)

import { getFirestoreDiscordGuildRefByDiscordId } from '../../data/discord-guild/get-firestore-discord-guild-ref-by-discord-id'
import { FirestoreUserPrototype } from '../../types'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreUser } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { isNil, reject } from 'ramda'

export const buildUser: FirestoreBuilder<FirestoreUserPrototype, FirestoreUser> = async (prototype) =>
  ({
    discordId: prototype.discordId,
    discordUsername: prototype.discordUsername,
    discordAvatar: prototype.discordAvatar,
    discordBanner: prototype.discordBanner,
    discordGuilds: await Promise.all(
      prototype.discordGuildIds.map((discordId) =>
        getFirestoreDiscordGuildRefByDiscordId(discordId).then(R.toUndefined)
      )
    ).then(reject(isNil))
  } as FirestoreUser)

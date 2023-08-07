import { buildDiscordGuild } from '../../builders/discord-guild/build-discord-guild'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreDiscordGuildData, FirestoreDiscordGuildPrototype } from '@echo/firestore'
import { andThen, partialRight, pipe } from 'ramda'

export const addDiscordGuild: (
  discordGuildPrototype: FirestoreDiscordGuildPrototype
) => Promise<FirestoreDiscordGuildData> = (discordGuildPrototype) =>
  pipe(
    buildDiscordGuild,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.GUILDS).doc()])),
    andThen(convertDiscordGuild)
  )(discordGuildPrototype)

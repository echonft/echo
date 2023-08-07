import { buildDiscordGuild } from '../../builders/discord-guild/build-discord-guild'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreDiscordGuildData, FirestoreDiscordGuildPrototype } from '@echo/firestore'
import { andThen, partial, pipe } from 'ramda'

export const addDiscordGuild: (
  discordGuildPrototype: FirestoreDiscordGuildPrototype
) => Promise<FirestoreDiscordGuildData> = pipe(
  buildDiscordGuild,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.GUILDS).doc()])),
  andThen(convertDiscordGuild)
)

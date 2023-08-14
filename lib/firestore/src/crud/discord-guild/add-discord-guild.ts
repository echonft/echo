import { buildDiscordGuild } from '../../builders/discord-guild/build-discord-guild'
import { CollectionName } from '../../config/collection-name'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { FirestoreDiscordGuildData } from '../../types/model/data/discord-guild/firestore-discord-guild-data'
import { FirestoreDiscordGuildPrototype } from '../../types/prototypes/discord-guild/firestore-discord-guild-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
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

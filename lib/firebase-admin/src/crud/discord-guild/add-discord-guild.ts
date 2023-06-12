import { buildDiscordGuild } from '../../builders/discord-guild/build-discord-guild'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreDiscordGuildData, FirestoreDiscordGuildPrototype } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partialRight, pipe, unless } from 'ramda'

export const addDiscordGuild: (
  discordGuildPrototype: FirestoreDiscordGuildPrototype
) => Promise<R.Result<FirestoreDiscordGuildData, Error>> = (discordGuildPrototype) =>
  pipe(
    buildDiscordGuild,
    andThen(partialRight(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.GUILDS).doc()])),
    andThen(
      pipe(
        unless(R.isError, pipe(R.getExn, convertDiscordGuild, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreDiscordGuildData, Error>>>
      )
    )
  )(discordGuildPrototype)

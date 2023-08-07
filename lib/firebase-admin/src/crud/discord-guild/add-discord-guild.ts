import { buildDiscordGuild } from '../../builders/discord-guild/build-discord-guild'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreDiscordGuildData, FirestoreDiscordGuildPrototype } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partial, pipe, unless } from 'ramda'

export const addDiscordGuild: (
  discordGuildPrototype: FirestoreDiscordGuildPrototype
) => Promise<R.Result<FirestoreDiscordGuildData, Error>> = (discordGuildPrototype) =>
  pipe(
    buildDiscordGuild,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.GUILDS).doc()])),
    andThen(
      pipe(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        unless(R.isError, pipe(R.getExn, convertDiscordGuild, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreDiscordGuildData, Error>>>
      )
    )
  )(discordGuildPrototype)

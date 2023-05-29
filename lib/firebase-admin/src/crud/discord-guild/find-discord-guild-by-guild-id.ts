import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreDiscordGuildData } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findDiscordGuildByGuildId = (guildId: string): Promise<R.Result<FirestoreDiscordGuildData, Error>> =>
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', guildId),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        pipe(errorPromise<FirestoreDiscordGuildData>('not found'), R.fromPromise<FirestoreDiscordGuildData>),
        pipe(pipe(head, castAs, convertDiscordGuild, R.fromPromise<FirestoreDiscordGuildData>))
      )
    )
  )(CollectionName.GUILDS)

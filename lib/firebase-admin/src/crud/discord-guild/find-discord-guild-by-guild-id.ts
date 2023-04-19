import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { mapDiscordGuild } from '@echo/firestore'
import { DiscordGuild } from '@echo/model'
import { castAs, errorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findDiscordGuildByGuildId = (guildId: string): Promise<R.Result<DiscordGuild, Error>> =>
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', guildId),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        pipe(errorPromise<DiscordGuild>('not found'), R.fromPromise<DiscordGuild>),
        pipe(pipe(head, castAs, convertDiscordGuild, mapDiscordGuild, R.fromPromise<DiscordGuild>))
      )
    )
  )('guilds')

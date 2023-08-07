import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreDiscordGuildData } from '@echo/firestore'
import { errorPromise } from '@echo/utils'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findDiscordGuildByGuildId = (guildId: string): Promise<FirestoreDiscordGuildData> =>
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', guildId),
    getCollectionDocs,
    andThen(ifElse(isEmpty, errorPromise<FirestoreDiscordGuildData>('not found'), pipe(head, convertDiscordGuild)))
  )(CollectionName.GUILDS)

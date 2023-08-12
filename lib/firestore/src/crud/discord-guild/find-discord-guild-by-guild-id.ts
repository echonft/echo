import { CollectionName } from '../../config/collection-name'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { FirestoreDiscordGuildData } from '../../types/model/data/discord-guild/firestore-discord-guild-data'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { errorPromise } from '@echo/utils'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findDiscordGuildByGuildId = (guildId: string): Promise<FirestoreDiscordGuildData> =>
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', guildId),
    getCollectionDocs,
    andThen(ifElse(isEmpty, errorPromise<FirestoreDiscordGuildData>('not found'), pipe(head, convertDiscordGuild)))
  )(CollectionName.GUILDS)

import { CollectionName } from '../../constants/collection-name'
import { convertDiscordGuild } from '../../converters/discord-guild/convert-discord-guild'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { FirestoreDiscordGuildData } from '../../types/model/data/discord-guild/firestore-discord-guild-data'
import { errorPromise } from '@echo/utils'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findDiscordGuildByGuildId = (guildId: string): Promise<FirestoreDiscordGuildData> =>
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', guildId),
    getCollectionDocs,
    andThen(ifElse(isEmpty, errorPromise<FirestoreDiscordGuildData>('not found'), pipe(head, convertDiscordGuild)))
  )(CollectionName.GUILDS)

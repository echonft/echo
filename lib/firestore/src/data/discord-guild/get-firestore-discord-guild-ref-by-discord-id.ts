import { CollectionName } from '../../constants/collection-name'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { FirestoreDiscordGuild } from '../../types/model/collections/discord-guild/firestore-discord-guild'
import { errorPromise } from '@echo/utils'
import { DocumentReference } from 'firebase-admin/firestore'
import { andThen, head, ifElse, isEmpty, pipe, prop } from 'ramda'

export const getFirestoreDiscordGuildRefByDiscordId = (
  discordId: string
): Promise<DocumentReference<FirestoreDiscordGuild>> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', discordId),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        errorPromise('getFirestoreDiscordGuildRefByDiscordId Discord Guild not found'),
        pipe(head, prop('ref'))
      )
    )
  )(CollectionName.GUILDS)

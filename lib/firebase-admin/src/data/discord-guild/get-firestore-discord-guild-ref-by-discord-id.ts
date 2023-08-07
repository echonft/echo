import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreDiscordGuild } from '@echo/firestore'
import { errorPromise } from '@echo/utils'
import { DocumentReference } from '@google-cloud/firestore'
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

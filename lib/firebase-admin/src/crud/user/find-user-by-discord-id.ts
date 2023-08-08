import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreUserData } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findUserByDiscordId = (discordId: string): Promise<FirestoreUserData> =>
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', discordId),
    getCollectionDocs,
    andThen(ifElse(isEmpty, errorPromise<FirestoreUserData>('not found'), pipe(head, castAs, convertUser)))
  )(CollectionName.USERS)

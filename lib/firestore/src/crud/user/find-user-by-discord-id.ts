import { CollectionName } from '../../constants/collection-name'
import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { FirestoreUserData } from '../../types/model/data/user/firestore-user-data'
import { errorPromise } from '@echo/utils'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findUserByDiscordId = (discordId: string): Promise<FirestoreUserData> =>
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', discordId),
    getCollectionDocs,
    andThen(ifElse(isEmpty, errorPromise<FirestoreUserData>('not found'), pipe(head, convertUser)))
  )(CollectionName.USERS)

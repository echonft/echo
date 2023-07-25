import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { CollectionName, FirestoreUser, FirestoreUserData } from '@echo/firestore'
import { promiseAll } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, map, pipe } from 'ramda'

export const getAllUsers = (): Promise<R.Result<FirestoreUserData[], Error>> =>
  pipe(
    getCollectionFromPath<FirestoreUser>,
    getCollectionDocs,
    andThen(pipe(map(convertUser), promiseAll<FirestoreUserData>, R.fromPromise))
  )(CollectionName.USERS)

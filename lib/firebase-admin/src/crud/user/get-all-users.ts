import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { CollectionName, FirestoreUserData } from '@echo/firestore'
import { promiseAll } from '@echo/utils'
import { andThen, map, pipe } from 'ramda'

export const getAllUsers = (): Promise<FirestoreUserData[]> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(getCollectionFromPath, getCollectionDocs, andThen(pipe(map(convertUser), promiseAll)))(CollectionName.USERS)

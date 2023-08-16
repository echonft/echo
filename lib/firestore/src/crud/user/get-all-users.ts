import { CollectionName } from '../../constants/collection-name'
import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { FirestoreUserData } from '../../types/model/data/user/firestore-user-data'
import { promiseAll } from '@echo/utils'
import { andThen, map, pipe } from 'ramda'

export const getAllUsers = (): Promise<FirestoreUserData[]> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(getCollectionFromPath, getCollectionDocs, andThen(pipe(map(convertUser), promiseAll)))(CollectionName.USERS)

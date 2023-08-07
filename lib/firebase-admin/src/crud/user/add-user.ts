import { buildUser } from '../../builders/user/build-user'
import { convertUser } from '../../converters/user/convert-user'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreUserData, FirestoreUserPrototype } from '@echo/firestore'
import { andThen, partial, pipe } from 'ramda'

export const addUser: (userPrototype: FirestoreUserPrototype) => Promise<FirestoreUserData> = pipe(
  buildUser,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.USERS).doc()])),
  andThen(convertUser)
)

import { buildUser } from '../../builders/user/build-user'
import { CollectionName } from '../../config/collection-name'
import { convertUser } from '../../converters/user/convert-user'
import { FirestoreUserData } from '../../types/model/data/user/firestore-user-data'
import { FirestoreUserPrototype } from '../../types/prototypes/user/firestore-user-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { andThen, partial, pipe } from 'ramda'

export const addUser: (userPrototype: FirestoreUserPrototype) => Promise<FirestoreUserData> = pipe(
  buildUser,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.USERS).doc()])),
  andThen(convertUser)
)

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildUser } from '../../builders/user/build-user'
import { convertUser } from '../../converters/user/convert-user'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreUserData, FirestoreUserPrototype } from '@echo/firestore'
import { andThen, partialRight, pipe } from 'ramda'

export const addUser: (userPrototype: FirestoreUserPrototype) => Promise<FirestoreUserData> = (userPrototype) =>
  // @ts-ignore
  pipe(
    buildUser,
    // @ts-ignore
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.USERS).doc()])),
    andThen(convertUser)
  )(userPrototype)

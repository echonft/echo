import { buildUser } from '../../builders/user/build-user'
import { convertUser } from '../../converters/user/convert-user'
import { FirestoreUserPrototype } from '../../types/prototypes/user/firestore-user-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { mapUser } from '@echo/firestore'
import { User } from '@echo/model'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partialRight, pipe, unless } from 'ramda'

export const addUser: (userPrototype: FirestoreUserPrototype) => Promise<R.Result<User, Error>> = (userPrototype) =>
  pipe(
    buildUser,
    andThen(partialRight(setDocAndReturnSnapshot, [getCollectionFromPath('users').doc()])),
    andThen(
      pipe(
        unless(R.isError, pipe(R.getExn, convertUser, mapUser, R.fromPromise)),
        castAs<Promise<R.Result<User, Error>>>
      )
    )
  )(userPrototype)

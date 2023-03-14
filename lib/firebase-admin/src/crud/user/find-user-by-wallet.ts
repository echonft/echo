import { convertUser } from '../../converters/user/convert-user'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { FirestoreUser, FirestoreWallet, mapUser } from '@echo/firestore'
import { User } from '@echo/model'
import { errorPromise, notNullable } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, ifElse, isEmpty, nth, pipe } from 'ramda'

export const findUserByWallet = (wallet: FirestoreWallet) =>
  pipe(
    getCollectionFromPath,
    whereCollection<FirestoreUser>('wallets', 'array-contains', wallet),
    getCollectionDocs,
    ifElse(
      isEmpty,
      pipe(errorPromise<User>('not found'), R.fromPromise<User>),
      pipe(
        notNullable<Promise<FirestoreSnapshot<FirestoreUser>>>(nth(0)),
        andThen(pipe(convertUser, mapUser, R.fromPromise<User>))
      )
    )
  )('users')

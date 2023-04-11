import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { FirestoreUser, FirestoreWallet, mapUser } from '@echo/firestore'
import { User } from '@echo/model'
import { castAs, errorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findUserByWallet = (wallet: FirestoreWallet) =>
  pipe(
    getCollectionFromPath,
    whereCollection<FirestoreUser>('wallets', 'array-contains', wallet),
    getCollectionDocs,
    ifElse(
      isEmpty,
      pipe(errorPromise<User>('not found'), R.fromPromise<User>),
      andThen(pipe(head, castAs, convertUser, mapUser, R.fromPromise<User>))
    )
  )('users')

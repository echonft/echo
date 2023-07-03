import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreUser, FirestoreUserData, FirestoreWallet } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findUserByWallet = (wallet: FirestoreWallet) =>
  pipe(
    getCollectionFromPath,
    whereCollection<FirestoreUser>('wallets', 'array-contains', wallet),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        pipe(errorPromise<FirestoreUserData>('User not found'), R.fromPromise<FirestoreUserData>),
        pipe(head, castAs, convertUser, R.fromPromise<FirestoreUserData>)
      )
    )
  )(CollectionName.USERS)

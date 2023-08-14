import { CollectionName } from '../../config/collection-name'
import { convertUser } from '../../converters/user/convert-user'
import { FirestoreWallet } from '../../types/model/collections/user/firestore-wallet'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { errorPromise, isNilOrEmpty } from '@echo/utils'
import { andThen, head, ifElse, pipe } from 'ramda'

export const findUserByWallet = (wallet: FirestoreWallet) =>
  pipe(
    getCollectionFromPath,
    whereCollection('wallets', 'array-contains', wallet),
    getCollectionDocs,
    andThen(ifElse(isNilOrEmpty, errorPromise('User not found'), pipe(head, convertUser)))
  )(CollectionName.USERS)

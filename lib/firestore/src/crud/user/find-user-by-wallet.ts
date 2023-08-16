import { CollectionName } from '../../constants/collection-name'
import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { FirestoreWallet } from '../../types/model/collections/user/firestore-wallet'
import { errorPromise, isNilOrEmpty } from '@echo/utils'
import { andThen, head, ifElse, pipe } from 'ramda'

export const findUserByWallet = (wallet: FirestoreWallet) =>
  pipe(
    getCollectionFromPath,
    whereCollection('wallets', 'array-contains', wallet),
    getCollectionDocs,
    andThen(ifElse(isNilOrEmpty, errorPromise('User not found'), pipe(head, convertUser)))
  )(CollectionName.USERS)

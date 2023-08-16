import { CollectionName } from '../../constants/collection-name'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { errorPromise } from '@echo/utils'
import { DocumentReference } from 'firebase-admin/firestore'
import { andThen, head, ifElse, isEmpty, pipe, prop } from 'ramda'

export const getFirestoreContractRefByAddress = (
  address: string,
  chainId: number
): Promise<DocumentReference<FirestoreContract>> =>
  pipe(
    getCollectionFromPath,
    whereCollection('address', '==', address),
    whereCollection('chainId', '==', chainId),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        errorPromise('getFirestoreContractRefByAddress Contract not found'),
        pipe(head, prop<DocumentReference<FirestoreContract>>('ref'))
      )
    )
  )(CollectionName.CONTRACTS)

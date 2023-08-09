import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreContract } from '@echo/firestore'
import { errorPromise } from '@echo/utils'
import { DocumentReference } from '@google-cloud/firestore'
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

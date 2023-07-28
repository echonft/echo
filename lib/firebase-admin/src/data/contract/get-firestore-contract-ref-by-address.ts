import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreContract } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { DocumentReference } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { always, andThen, head, ifElse, isEmpty, pipe, prop, useWith } from 'ramda'

export const getFirestoreContractRefByAddress = (
  address: string,
  chainId: number
): Promise<R.Result<DocumentReference<FirestoreContract>, Error>> =>
  pipe(
    getCollectionFromPath,
    whereCollection<FirestoreContract>('address', '==', address),
    whereCollection<FirestoreContract>('chainId', '==', chainId),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        pipe(errorPromise('getFirestoreContractRefByAddress Contract not found'), R.fromPromise),
        pipe(
          head,
          prop<DocumentReference<FirestoreContract>>('ref'),
          useWith(R.fromExecution, [always<DocumentReference<FirestoreContract>>])
        )
      )
    ),
    castAs<Promise<R.Result<DocumentReference<FirestoreContract>, Error>>>
  )(CollectionName.CONTRACTS)

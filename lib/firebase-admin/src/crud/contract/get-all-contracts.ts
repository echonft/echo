import { convertContract } from '../../converters/contract/convert-contract'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { CollectionName, FirestoreContract, FirestoreContractData } from '@echo/firestore'
import { promiseAll } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, map, pipe } from 'ramda'

export const getAllContracts = (): Promise<R.Result<FirestoreContractData[], Error>> =>
  pipe(
    getCollectionFromPath<FirestoreContract>,
    getCollectionDocs,
    andThen(pipe(map(convertContract), promiseAll<FirestoreContractData>, R.fromPromise))
  )(CollectionName.CONTRACTS)

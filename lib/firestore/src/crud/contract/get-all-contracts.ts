import { CollectionName } from '../../constants/collection-name'
import { convertContract } from '../../converters/contract/convert-contract'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { promiseAll } from '@echo/utils'
import { andThen, map, pipe } from 'ramda'

export const getAllContracts = (): Promise<FirestoreContractData[]> =>
  pipe(
    getCollectionFromPath<FirestoreContract>,
    getCollectionDocs,
    andThen(pipe(map(convertContract), promiseAll))
  )(CollectionName.CONTRACTS)

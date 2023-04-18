import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { FirestoreNftCollectionData } from '../../types/model/data/nft-collection/firestore-nft-collection-data'
import { FirestoreOpenSeaCollectionDetailsData } from '../../types/model/data/nft-collection/firestore-open-sea-collection-details-data'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { mapContract } from '../contract/map-contract'
import { mapOpenSeaCollectionDetails } from './map-open-sea-collection-details'
import { Contract, NftCollection, OpenSeaCollectionMetadata } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, omit, pipe } from 'ramda'

export const mapNftCollection: FirestoreMapper<FirestoreNftCollectionData, NftCollection> = andThen(
  pipe(
    omit(['refPath']),
    juxt([
      propToPromise('id'),
      propToMappedDocument<FirestoreContractData, Contract>('contract', mapContract),
      propToPromise('totalSupply'),
      propToMappedDocument<FirestoreOpenSeaCollectionDetailsData, OpenSeaCollectionMetadata>(
        'openSea',
        mapOpenSeaCollectionDetails
      )
    ]),
    promiseAll,
    zipPromisesToObject<NftCollection>(['id', 'contract', 'totalSupply', 'openSea'])
  )
)

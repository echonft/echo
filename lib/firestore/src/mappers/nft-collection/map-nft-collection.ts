import { FirestoreContractData, FirestoreNftCollectionData, FirestoreOpenSeaCollectionDetailsData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { mapContract } from '../contract'
import { mapOpenSeaCollectionDetails } from './map-open-sea-collection-details'
import { Contract, NftCollection, OpenSeaCollectionMetadata } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapNftCollection: FirestoreMapper<FirestoreNftCollectionData, NftCollection> = andThen(
  pipe(
    juxt([
      propToPromise<string>('id'),
      propToMappedDocument<FirestoreContractData, Contract>('contract', mapContract),
      propToPromise<number | undefined>('totalSupply'),
      propToMappedDocument<FirestoreOpenSeaCollectionDetailsData, OpenSeaCollectionMetadata>(
        'openSea',
        mapOpenSeaCollectionDetails
      )
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<NftCollection>(['id', 'contract', 'totalSupply', 'openSea'])
  )
)

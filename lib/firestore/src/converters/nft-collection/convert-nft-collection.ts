import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { FirestoreOpenSeaCollectionDetails } from '../../types/model/collections/nft-collection/firestore-open-sea-collection-details'
import { FirestoreNftCollectionData } from '../../types/model/data/nft-collection/firestore-nft-collection-data'
import { FirestoreOpenSeaCollectionDetailsData } from '../../types/model/data/nft-collection/firestore-open-sea-collection-details-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { nestedDocumentProp } from '../../utils/converter/nested-document-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { convertOpenSeaCollectionDetails } from './convert-open-sea-collection-details'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertNftCollection: FirestoreConverter<FirestoreNftCollection, FirestoreNftCollectionData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('totalSupply'),
    refProp('contract', convertContract),
    nestedDocumentProp<FirestoreOpenSeaCollectionDetails, FirestoreOpenSeaCollectionDetailsData>(
      'openSea',
      convertOpenSeaCollectionDetails
    )
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreNftCollectionData>(['refPath', 'id', 'totalSupply', 'contract', 'openSea'])
)

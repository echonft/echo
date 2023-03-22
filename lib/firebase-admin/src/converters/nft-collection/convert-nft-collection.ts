import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { nestedDocumentProp } from '../../utils/converter/nested-document-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { convertOpenSeaCollectionDetails } from './convert-open-sea-collection-details'
import {
  FirestoreNftCollection,
  FirestoreNftCollectionData,
  FirestoreOpenSeaCollectionDetails,
  FirestoreOpenSeaCollectionDetailsData
} from '@echo/firestore'
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

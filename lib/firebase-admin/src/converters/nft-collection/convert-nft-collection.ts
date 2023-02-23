import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
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
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertNftCollection: FirestoreConverter<FirestoreNftCollection, FirestoreNftCollectionData> = pipe(
  convertSnapshot,
  juxt([
    propToPromise<string>('id'),
    propToPromise<number>('totalSupply'),
    refProp('contract', convertContract),
    nestedDocumentProp<FirestoreOpenSeaCollectionDetails, FirestoreOpenSeaCollectionDetailsData>(
      'openSea',
      convertOpenSeaCollectionDetails
    )
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreNftCollectionData>(['id', 'totalSupply', 'contract', 'openSea'])
)

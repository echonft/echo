import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreOpenSeaCollectionDetails, FirestoreOpenSeaCollectionDetailsData } from '@echo/firestore'
import { castAs, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertOpenSeaCollectionDetails: FirestoreNestedDocumentConverter<
  FirestoreOpenSeaCollectionDetails,
  FirestoreOpenSeaCollectionDetailsData
> = pipe<
  [FirestoreOpenSeaCollectionDetails],
  FirestoreOpenSeaCollectionDetailsData,
  Promise<FirestoreOpenSeaCollectionDetailsData>
>(castAs, toPromise)

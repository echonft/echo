import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreOpenSeaCollectionDetails } from '../../types/model/collections/nft-collection/firestore-open-sea-collection-details'
import { FirestoreOpenSeaCollectionDetailsData } from '../../types/model/data/nft-collection/firestore-open-sea-collection-details-data'
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

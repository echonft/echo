import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { ListingTarget } from '../types/model/listing-target'
import { ListingTargetDocumentData } from '../types/model/listing-target-document-data'
import { nftCollectionDocumentDataConverter } from './nft-collection-document-data-converter'
import { applySpec, pipe, prop } from 'ramda'

export const listingTargetDocumentDataConverter: FirestoreDocumentDataConverter<
  ListingTargetDocumentData,
  ListingTarget
> = {
  fromFirestore: applySpec<ListingTarget>({
    collection: documentDataPropToModel('collection', nftCollectionDocumentDataConverter),
    amount: prop('amount')
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(removeUndefinedProps, modelPropToDocumentData('collection', nftCollectionDocumentDataConverter))
}

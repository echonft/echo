import { documentDataPropToModel } from '../helpers/converters/document-data-prop-to-model'
import { modelPropToDocumentData } from '../helpers/converters/model-prop-to-document-data'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { ListingTarget } from '../types/model/listing-target'
import { ListingTargetDocumentData } from '../types/model/listing-target-document-data'
import { nftCollectionDocumentDataConverter } from './nft-collection-document-data-converter'

export const listingTargetDocumentDataConverter: FirestoreDocumentDataConverter<
  ListingTargetDocumentData,
  ListingTarget
> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: documentDataPropToModel('collection', nftCollectionDocumentDataConverter),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modelPropToDocumentData('collection', nftCollectionDocumentDataConverter)
}

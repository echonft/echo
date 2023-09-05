import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { ListingTargetDocumentData } from '../types/model/listing-target-document-data'
import { nftCollectionDocumentDataConverter } from './nft-collection-document-data-converter'
import { ListingTarget } from '@echo/firestore-types'

export const listingTargetDocumentDataConverter: FirestoreDocumentDataConverter<
  ListingTargetDocumentData,
  ListingTarget
> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: modifyDocumentDataProp('collection', nftCollectionDocumentDataConverter),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyModelProp('collection', nftCollectionDocumentDataConverter)
}

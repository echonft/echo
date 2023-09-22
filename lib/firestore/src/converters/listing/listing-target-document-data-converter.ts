import { nftCollectionDocumentDataConverter } from '@echo/firestore/converters/nft-collection/nft-collection-document-data-converter'
import { modifyDocumentDataProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import type { ListingTargetDocumentData } from '@echo/firestore/types/model/listing/listing-target-document-data'

export const listingTargetDocumentDataConverter: FirestoreDocumentDataConverter<
  ListingTargetDocumentData,
  FirestoreListingTarget
> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: modifyDocumentDataProp('collection', nftCollectionDocumentDataConverter),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: modifyModelProp('collection', nftCollectionDocumentDataConverter)
}

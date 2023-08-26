import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { ListingItem } from '../types/model/listing-item'
import { ListingItemDocumentData } from '../types/model/listing-item-document-data'
import { nftDocumentDataConverter } from './nft-document-data-converter'
import { applySpec, pipe, prop } from 'ramda'

export const listingItemDocumentDataConverter: FirestoreDocumentDataConverter<ListingItemDocumentData, ListingItem> = {
  fromFirestore: applySpec<ListingItem>({
    amount: prop('amount'),
    nft: documentDataPropToModel('nft', nftDocumentDataConverter)
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(modelPropToDocumentData('nft', nftDocumentDataConverter))
}

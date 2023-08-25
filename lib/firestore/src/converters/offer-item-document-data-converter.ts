import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { OfferItem } from '../types/model/offer-item'
import { OfferItemDocumentData } from '../types/model/offer-item-document-data'
import { nftDocumentDataConverter } from './nft-document-data-converter'
import { applySpec, pipe, prop } from 'ramda'

export const offerItemDocumentDataConverter: FirestoreDocumentDataConverter<OfferItemDocumentData, OfferItem> = {
  fromFirestore: applySpec<OfferItem>({
    amount: prop('amount'),
    nft: documentDataPropToModel('nft', nftDocumentDataConverter),
    approved: prop('approved')
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(modelPropToDocumentData('nft', nftDocumentDataConverter))
}

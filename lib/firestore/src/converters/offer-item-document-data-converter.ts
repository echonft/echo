import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { OfferItemDocumentData } from '../types/model/offer-item-document-data'
import { nftDocumentDataConverter } from './nft-document-data-converter'
import { OfferItem } from '@echo/firestore-types'
import { pipe } from 'ramda'

export const offerItemDocumentDataConverter: FirestoreDocumentDataConverter<OfferItemDocumentData, OfferItem> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: modifyDocumentDataProp('nft', nftDocumentDataConverter),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(modifyModelProp('nft', nftDocumentDataConverter))
}

import { documentDataPropToModel } from '../helpers/converters/document-data-prop-to-model'
import { modelPropToDocumentData } from '../helpers/converters/model-prop-to-document-data'
import { stringPropToUrl } from '../helpers/converters/string-prop-to-url'
import { urlPropToString } from '../helpers/converters/url-prop-to-string'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { OfferItem } from '../types/model/offer-item'
import { OfferItemDocumentData } from '../types/model/offer-item-document-data'
import { nftCollectionDocumentDataConverter } from './nft-collection-document-data-converter'
import { pipe } from 'ramda'

export const offerItemDocumentDataConverter: FirestoreDocumentDataConverter<OfferItemDocumentData, OfferItem> = {
  fromFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stringPropToUrl('blurUrl'),
    documentDataPropToModel('collection', nftCollectionDocumentDataConverter),
    stringPropToUrl('openSeaUrl'),
    stringPropToUrl('pictureUrl'),
    stringPropToUrl('thumbnailUrl')
  ),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    urlPropToString('blurUrl'),
    modelPropToDocumentData('collection', nftCollectionDocumentDataConverter),
    urlPropToString('openSeaUrl'),
    urlPropToString('pictureUrl'),
    urlPropToString('thumbnailUrl')
  )
}

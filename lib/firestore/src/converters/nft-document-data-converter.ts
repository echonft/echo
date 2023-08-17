import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { stringPropToUrl } from '../helpers/converters/from-firestore/string-prop-to-url'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { urlPropToString } from '../helpers/converters/to-firestore/url-prop-to-string'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { Nft } from '../types/model/nft'
import { NftDocumentData } from '../types/model/nft-document-data'
import { nftCollectionDocumentDataConverter } from './nft-collection-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
import { applySpec, pipe, prop } from 'ramda'

export const nftDocumentDataConverter: FirestoreDocumentDataConverter<NftDocumentData, Nft> = {
  fromFirestore: applySpec<Nft>({
    attributes: prop('attributes'),
    balance: prop('balance'),
    blurUrl: stringPropToUrl('blurUrl'),
    collection: documentDataPropToModel('collection', nftCollectionDocumentDataConverter),
    name: prop('name'),
    openSeaUrl: stringPropToUrl('openSeaUrl'),
    owner: documentDataPropToModel('owner', userDetailsDocumentDataConverter),
    pictureUrl: stringPropToUrl('pictureUrl'),
    thumbnailUrl: stringPropToUrl('thumbnailUrl'),
    tokenId: prop('tokenId'),
    tokenType: prop('tokenType')
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    removeUndefinedProps,
    urlPropToString('blurUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modelPropToDocumentData('collection', nftCollectionDocumentDataConverter),
    modelPropToDocumentData('owner', userDetailsDocumentDataConverter),
    urlPropToString('openSeaUrl'),
    urlPropToString('pictureUrl'),
    urlPropToString('thumbnailUrl')
  )
}

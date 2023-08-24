import { documentDataPropToModel } from '../helpers/converters/from-firestore/document-data-prop-to-model'
import { stringPropToUrl } from '../helpers/converters/from-firestore/string-prop-to-url'
import { modelPropToDocumentData } from '../helpers/converters/to-firestore/model-prop-to-document-data'
import { removeUndefinedProps } from '../helpers/converters/to-firestore/remove-undefined-props'
import { urlPropToString } from '../helpers/converters/to-firestore/url-prop-to-string'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { NftCollection } from '../types/model/nft-collection'
import { NftCollectionDocumentData } from '../types/model/nft-collection-document-data'
import { contractDocumentDataConverter } from './contract-document-data-converter'
import { applySpec, pipe, prop } from 'ramda'

export const nftCollectionDocumentDataConverter: FirestoreDocumentDataConverter<
  NftCollectionDocumentData,
  NftCollection
> = {
  fromFirestore: applySpec<NftCollection>({
    id: prop('id'),
    bannerUrl: stringPropToUrl('bannerUrl'),
    blurUrl: stringPropToUrl('blurUrl'),
    contract: documentDataPropToModel('contract', contractDocumentDataConverter),
    description: prop('description'),
    discordGuild: prop('discordGuild'),
    discordUrl: stringPropToUrl('discordUrl'),
    floorPrice: prop('floorPrice'),
    name: prop('name'),
    openSeaUrl: stringPropToUrl('openSeaUrl'),
    profilePictureUrl: stringPropToUrl('profilePictureUrl'),
    slug: prop('slug'),
    totalSupply: prop('totalSupply'),
    twitterUsername: prop('twitterUsername'),
    websiteUrl: stringPropToUrl('websiteUrl')
  }),
  toFirestore: pipe(
    removeUndefinedProps,
    urlPropToString('bannerUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    urlPropToString('blurUrl'),
    modelPropToDocumentData('contract', contractDocumentDataConverter),
    urlPropToString('discordUrl'),
    urlPropToString('openSeaUrl'),
    urlPropToString('profilePictureUrl'),
    urlPropToString('websiteUrl')
  )
}

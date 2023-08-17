import { stringPropToUrl } from '../helpers/converters/string-prop-to-url'
import { urlPropToString } from '../helpers/converters/url-prop-to-string'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { NftCollection } from '../types/model/nft-collection'
import { NftCollectionDocumentData } from '../types/model/nft-collection-document-data'
import { pipe } from 'ramda'

export const nftCollectionDocumentDataConverter: FirestoreDocumentDataConverter<
  NftCollectionDocumentData,
  NftCollection
> = {
  fromFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    stringPropToUrl('bannerUrl'),
    stringPropToUrl('blurUrl'),
    stringPropToUrl('discordUrl'),
    stringPropToUrl('openSeaUrl'),
    stringPropToUrl('profilePictureUrl'),
    stringPropToUrl('websiteUrl')
  ),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    urlPropToString('bannerUrl'),
    urlPropToString('blurUrl'),
    urlPropToString('discordUrl'),
    urlPropToString('openSeaUrl'),
    urlPropToString('profilePictureUrl'),
    urlPropToString('websiteUrl')
  )
}

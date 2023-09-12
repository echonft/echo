import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { NftCollectionDocumentData } from '../types/model/nft-collection-document-data'
import { contractDocumentDataConverter } from './contract-document-data-converter'
import { NftCollection } from '@echo/firestore-types'
import modifyStringPropToUrl from '@echo/utils/modify-string-prop-to-url'
import modifyUrlPropToString from '@echo/utils/modify-url-prop-to-string'
import { pipe } from 'ramda'

export const nftCollectionDocumentDataConverter: FirestoreDocumentDataConverter<
  NftCollectionDocumentData,
  NftCollection
> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: pipe(
    modifyStringPropToUrl('bannerUrl'),
    modifyStringPropToUrl('blurUrl'),
    modifyDocumentDataProp('contract', contractDocumentDataConverter),
    modifyStringPropToUrl('discordUrl'),
    modifyStringPropToUrl('openSeaUrl'),
    modifyStringPropToUrl('profilePictureUrl'),
    modifyStringPropToUrl('websiteUrl')
  ),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyUrlPropToString('bannerUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyUrlPropToString('blurUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyModelProp('contract', contractDocumentDataConverter),
    modifyUrlPropToString('discordUrl'),
    modifyUrlPropToString('openSeaUrl'),
    modifyUrlPropToString('profilePictureUrl'),
    modifyUrlPropToString('websiteUrl')
  )
}

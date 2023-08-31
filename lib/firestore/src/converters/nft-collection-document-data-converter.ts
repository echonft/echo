import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { NftCollection } from '../types/model/nft-collection'
import { NftCollectionDocumentData } from '../types/model/nft-collection-document-data'
import { contractDocumentDataConverter } from './contract-document-data-converter'
import {
  assocUndefinedIfPropNotPresent,
  modifyStringPropToUrl,
  modifyUrlPropToString,
  removeUndefinedProps
} from '@echo/utils'
import { pipe } from 'ramda'

export const nftCollectionDocumentDataConverter: FirestoreDocumentDataConverter<
  NftCollectionDocumentData,
  NftCollection
> = {
  fromFirestore: pipe(
    modifyStringPropToUrl('bannerUrl'),
    modifyStringPropToUrl('blurUrl'),
    modifyDocumentDataProp('contract', contractDocumentDataConverter),
    modifyStringPropToUrl('discordUrl'),
    assocUndefinedIfPropNotPresent('floorPrice'),
    modifyStringPropToUrl('openSeaUrl'),
    modifyStringPropToUrl('profilePictureUrl'),
    assocUndefinedIfPropNotPresent('totalSupply'),
    assocUndefinedIfPropNotPresent('twitterUsername'),
    modifyStringPropToUrl('websiteUrl')
  ),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    removeUndefinedProps,
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

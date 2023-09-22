import { contractDocumentDataConverter } from '@echo/firestore/converters/contract/contract-document-data-converter'
import { modifyDocumentDataProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import type { NftCollectionDocumentData } from '@echo/firestore/types/model/nft-collection/nft-collection-document-data'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
import { modifyUrlPropToString } from '@echo/utils/fp/modify-url-prop-to-string'
import { pipe } from 'ramda'

export const nftCollectionDocumentDataConverter: FirestoreDocumentDataConverter<
  NftCollectionDocumentData,
  FirestoreNftCollection
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

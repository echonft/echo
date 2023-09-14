import { nftAttributeDocumentDataConverter } from '@echo/firestore/converters/nft-attribute-document-data-converter'
import { nftCollectionDocumentDataConverter } from '@echo/firestore/converters/nft-collection-document-data-converter'
import { userDetailsDocumentDataConverter } from '@echo/firestore/converters/user-details-document-data-converter'
import { modifyDocumentDataArrayProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-array-prop'
import { modifyDocumentDataProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
import { modifyUrlPropToString } from '@echo/utils/fp/modify-url-prop-to-string'
import { pipe } from 'ramda'

export const nftDocumentDataConverter: FirestoreDocumentDataConverter<NftDocumentData, FirestoreNft> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: pipe(
    modifyDocumentDataArrayProp('attributes', nftAttributeDocumentDataConverter),
    modifyStringPropToUrl('blurUrl'),
    modifyDocumentDataProp('collection', nftCollectionDocumentDataConverter),
    modifyStringPropToUrl('openSeaUrl'),
    modifyDocumentDataProp('owner', userDetailsDocumentDataConverter),
    modifyStringPropToUrl('pictureUrl'),
    modifyStringPropToUrl('thumbnailUrl')
  ),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyUrlPropToString('blurUrl'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyModelProp('collection', nftCollectionDocumentDataConverter),
    modifyModelProp('owner', userDetailsDocumentDataConverter),
    modifyUrlPropToString('openSeaUrl'),
    modifyUrlPropToString('pictureUrl'),
    modifyUrlPropToString('thumbnailUrl')
  )
}

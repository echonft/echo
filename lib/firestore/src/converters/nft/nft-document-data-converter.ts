import { nftAttributeDocumentDataConverter } from '@echo/firestore/converters/nft/nft-attribute-document-data-converter'
import { nftCollectionDocumentDataConverter } from '@echo/firestore/converters/nft-collection/nft-collection-document-data-converter'
import { modifyDocumentDataArrayProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-array-prop'
import { modifyDocumentDataProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
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
    modifyUrlPropToString('openSeaUrl'),
    modifyUrlPropToString('pictureUrl'),
    modifyUrlPropToString('thumbnailUrl')
  )
}

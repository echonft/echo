import { modifyDocumentDataProp } from '../helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '../helpers/converters/to-firestore/modify-model-prop'
import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { NftDocumentData } from '../types/model/nft-document-data'
import { nftCollectionDocumentDataConverter } from './nft-collection-document-data-converter'
import { userDetailsDocumentDataConverter } from './user-details-document-data-converter'
import { Nft } from '@echo/firestore-types'
import { modifyStringPropToUrl, modifyUrlPropToString } from '@echo/utils'
import { pipe } from 'ramda'

export const nftDocumentDataConverter: FirestoreDocumentDataConverter<NftDocumentData, Nft> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: pipe(
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

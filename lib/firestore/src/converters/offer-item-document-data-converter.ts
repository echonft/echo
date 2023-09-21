import { nftDocumentDataConverter } from '@echo/firestore/converters/nft-document-data-converter'
import { modifyDocumentDataProp } from '@echo/firestore/helpers/converters/from-firestore/modify-document-data-prop'
import { modifyModelProp } from '@echo/firestore/helpers/converters/to-firestore/modify-model-prop'
import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/offer/firestore-offer-item'
import type { OfferItemDocumentData } from '@echo/firestore/types/model/offer/offer-item-document-data'
import { pipe } from 'ramda'

export const offerItemDocumentDataConverter: FirestoreDocumentDataConverter<OfferItemDocumentData, FirestoreOfferItem> =
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fromFirestore: modifyDocumentDataProp('nft', nftDocumentDataConverter),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    toFirestore: pipe(modifyModelProp('nft', nftDocumentDataConverter))
  }

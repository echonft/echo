import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import type { NftAttributeDocumentData } from '@echo/firestore/types/model/nft-attribute-document-data'
import { identity, invoker, modify, pipe } from 'ramda'

export const nftAttributeDocumentDataConverter: FirestoreDocumentDataConverter<NftAttributeDocumentData, FirestoreNft> =
  {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fromFirestore: pipe(modify('trait', invoker(0, 'toString')), modify('value', invoker(0, 'toString'))),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    toFirestore: identity
  }

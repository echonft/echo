import { FirestoreDocumentDataConverter } from '../types/converters/firestore-document-data-converter'
import { NftAttributeDocumentData } from '../types/model/nft-attribute-document-data'
import { Nft } from '@echo/firestore-types'
import { identity, invoker, modify, pipe } from 'ramda'

export const nftAttributeDocumentDataConverter: FirestoreDocumentDataConverter<NftAttributeDocumentData, Nft> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fromFirestore: pipe(modify('trait', invoker(0, 'toString')), modify('value', invoker(0, 'toString'))),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toFirestore: identity
}

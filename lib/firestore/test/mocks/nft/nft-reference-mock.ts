import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const nftReferenceMock: { [key: string]: DocumentReference<NftDocumentData> } = {
  '8hHFadIrrooORfTOLkBg': {
    id: '8hHFadIrrooORfTOLkBg',
    path: 'nfts/8hHFadIrrooORfTOLkBg'
  } as unknown as DocumentReference<NftDocumentData>,
  QFjMRNChUAHNswkRADXh: {
    id: 'QFjMRNChUAHNswkRADXh',
    path: 'nfts/QFjMRNChUAHNswkRADXh'
  } as unknown as DocumentReference<NftDocumentData>
}

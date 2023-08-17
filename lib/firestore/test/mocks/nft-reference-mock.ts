import { NftDocumentData } from '../../src/types/model/nft-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

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

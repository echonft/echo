import { NftDocumentData } from '../../src/types/model/nft-document-data'
import { nftDocumentDataMock } from './nft-document-data-mock'
import { nftReferenceMock } from './nft-reference-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export const nftSnapshotMock: { [key: string]: QueryDocumentSnapshot<NftDocumentData> } = {
  '8hHFadIrrooORfTOLkBg': {
    ref: nftReferenceMock['8hHFadIrrooORfTOLkBg']!,
    id: nftReferenceMock['8hHFadIrrooORfTOLkBg']!.id,
    exists: true,
    data: () => nftDocumentDataMock['8hHFadIrrooORfTOLkBg']
  } as unknown as QueryDocumentSnapshot<NftDocumentData>,
  QFjMRNChUAHNswkRADXh: {
    ref: nftReferenceMock['QFjMRNChUAHNswkRADXh']!,
    id: nftReferenceMock['QFjMRNChUAHNswkRADXh']!.id,
    exists: true,
    data: () => nftDocumentDataMock['QFjMRNChUAHNswkRADXh']
  } as unknown as QueryDocumentSnapshot<NftDocumentData>
}

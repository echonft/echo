import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import { nftDocumentDataMock } from '@echo/firestore-mocks/nft-document-data-mock'
import { nftReferenceMock } from '@echo/firestore-mocks/nft-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'

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

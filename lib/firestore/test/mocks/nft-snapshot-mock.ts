import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { NftDocumentData } from '../../src/types/model/document-data/nft-document-data'
import { nftDocumentDataMock } from './nft-document-data-mock'
import { nftReferenceMock } from './nft-reference-mock'

export const nftSnapshotMock: { [key: string]: FirestoreSnapshot<NftDocumentData> } = {
  '8hHFadIrrooORfTOLkBg': {
    ref: nftReferenceMock['8hHFadIrrooORfTOLkBg']!,
    id: nftReferenceMock['8hHFadIrrooORfTOLkBg']!.id,
    exists: true,
    data: () => nftDocumentDataMock['8hHFadIrrooORfTOLkBg']
  } as unknown as FirestoreSnapshot<NftDocumentData>,
  QFjMRNChUAHNswkRADXh: {
    ref: nftReferenceMock['QFjMRNChUAHNswkRADXh']!,
    id: nftReferenceMock['QFjMRNChUAHNswkRADXh']!.id,
    exists: true,
    data: () => nftDocumentDataMock['QFjMRNChUAHNswkRADXh']
  } as unknown as FirestoreSnapshot<NftDocumentData>
}

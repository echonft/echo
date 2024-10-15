import { nftDocumentDataMock } from '@echo/firestore/mocks/nft/nft-document-data-mock'
import { nftReferenceMock } from '@echo/firestore/mocks/nft/nft-reference-mock'
import type { NftDocumentData } from '@echo/firestore/types/model/nft-document-data'
import type { Nft } from '@echo/model/types/nft'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function nftSnapshotMock(): Record<string, QueryDocumentSnapshot<Nft, NftDocumentData>> {
  return {
    '8hHFadIrrooORfTOLkBg': {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref: nftReferenceMock()['8hHFadIrrooORfTOLkBg']!,
      id: nftReferenceMock()['8hHFadIrrooORfTOLkBg']?.id,
      exists: true,
      data: () => nftDocumentDataMock()['8hHFadIrrooORfTOLkBg']
    } as unknown as QueryDocumentSnapshot<Nft, NftDocumentData>,
    iRZFKEujarikVjpiFAkE: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref: nftReferenceMock().iRZFKEujarikVjpiFAkE!,
      id: nftReferenceMock().iRZFKEujarikVjpiFAkE?.id,
      exists: true,
      data: () => nftDocumentDataMock().iRZFKEujarikVjpiFAkE
    } as unknown as QueryDocumentSnapshot<Nft, NftDocumentData>,
    '5SeF1NSN5uPUxtWSr516': {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref: nftReferenceMock()['5SeF1NSN5uPUxtWSr516']!,
      id: nftReferenceMock()['5SeF1NSN5uPUxtWSr516']?.id,
      exists: true,
      data: () => nftDocumentDataMock()['5SeF1NSN5uPUxtWSr516']
    } as unknown as QueryDocumentSnapshot<Nft, NftDocumentData>,
    QFjMRNChUAHNswkRADXh: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref: nftReferenceMock().QFjMRNChUAHNswkRADXh!,
      id: nftReferenceMock().QFjMRNChUAHNswkRADXh?.id,
      exists: true,
      data: () => nftDocumentDataMock().QFjMRNChUAHNswkRADXh
    } as unknown as QueryDocumentSnapshot<Nft, NftDocumentData>,
    XiDa6k2P7gxXCKSxn2wq: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref: nftReferenceMock().XiDa6k2P7gxXCKSxn2wq!,
      id: nftReferenceMock().XiDa6k2P7gxXCKSxn2wq?.id,
      exists: true,
      data: () => nftDocumentDataMock().XiDa6k2P7gxXCKSxn2wq
    } as unknown as QueryDocumentSnapshot<Nft, NftDocumentData>,
    kRE3UCfXWkJ33nwzj2X1: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref: nftReferenceMock().kRE3UCfXWkJ33nwzj2X1!,
      id: nftReferenceMock().kRE3UCfXWkJ33nwzj2X1?.id,
      exists: true,
      data: () => nftDocumentDataMock().kRE3UCfXWkJ33nwzj2X1
    } as unknown as QueryDocumentSnapshot<Nft, NftDocumentData>
  }
}

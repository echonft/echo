import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import type { Nft } from '@echo/model/types/nft'
import { DocumentReference } from 'firebase-admin/firestore'

export function nftReferenceMock(): Record<string, DocumentReference<Nft, NftDocumentData>> {
  return {
    '8hHFadIrrooORfTOLkBg': {
      id: '8hHFadIrrooORfTOLkBg',
      path: `${CollectionReferenceName.Nfts}/8hHFadIrrooORfTOLkBg`
    } as unknown as DocumentReference<Nft, NftDocumentData>,
    iRZFKEujarikVjpiFAkE: {
      id: 'iRZFKEujarikVjpiFAkE',
      path: `${CollectionReferenceName.Nfts}/iRZFKEujarikVjpiFAkE`
    } as unknown as DocumentReference<Nft, NftDocumentData>,
    '5SeF1NSN5uPUxtWSr516': {
      id: '5SeF1NSN5uPUxtWSr516',
      path: `${CollectionReferenceName.Nfts}/5SeF1NSN5uPUxtWSr516`
    } as unknown as DocumentReference<Nft, NftDocumentData>,
    QFjMRNChUAHNswkRADXh: {
      id: 'QFjMRNChUAHNswkRADXh',
      path: `${CollectionReferenceName.Nfts}/QFjMRNChUAHNswkRADXh`
    } as unknown as DocumentReference<Nft, NftDocumentData>,
    XiDa6k2P7gxXCKSxn2wq: {
      id: 'XiDa6k2P7gxXCKSxn2wq',
      path: `${CollectionReferenceName.Nfts}/XiDa6k2P7gxXCKSxn2wq`
    } as unknown as DocumentReference<Nft, NftDocumentData>,
    kRE3UCfXWkJ33nwzj2X1: {
      id: 'kRE3UCfXWkJ33nwzj2X1',
      path: `${CollectionReferenceName.Nfts}/kRE3UCfXWkJ33nwzj2X1`
    } as unknown as DocumentReference<Nft, NftDocumentData>
  }
}

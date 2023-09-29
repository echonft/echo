import type { NftCollectionDocumentData } from '@echo/firestore/types/model/nft-collection/nft-collection-document-data'
import { nftCollectionDocumentDataMock } from '@echo/firestore-mocks/nft-collection/nft-collection-document-data-mock'
import { nftCollectionReferenceMock } from '@echo/firestore-mocks/nft-collection/nft-collection-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const nftCollectionSnapshotMock: Record<string, QueryDocumentSnapshot<NftCollectionDocumentData>> = {
  Rc8pLQXxgyQGIRL0fr13: {
    ref: nftCollectionReferenceMock.Rc8pLQXxgyQGIRL0fr13!,
    id: nftCollectionReferenceMock.Rc8pLQXxgyQGIRL0fr13!.id,
    exists: true,
    data: () => nftCollectionDocumentDataMock.Rc8pLQXxgyQGIRL0fr13
  } as unknown as QueryDocumentSnapshot<NftCollectionDocumentData>,
  '1aomCtnoesD7WVll6Yi1': {
    ref: nftCollectionReferenceMock['1aomCtnoesD7WVll6Yi1']!,
    id: nftCollectionReferenceMock['1aomCtnoesD7WVll6Yi1']!.id,
    exists: true,
    data: () => nftCollectionDocumentDataMock['1aomCtnoesD7WVll6Yi1']
  } as unknown as QueryDocumentSnapshot<NftCollectionDocumentData>
}

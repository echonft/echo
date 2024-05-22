import type { NftIndex } from '@echo/model/types/nft-index'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { pick, pipe } from 'ramda'

export const nftIndexMock: Record<string, NftIndex> = {
  '8hHFadIrrooORfTOLkBg': {
    collection: pipe(getCollectionMockById, pick(['slug']))('1aomCtnoesD7WVll6Yi1'),
    tokenId: 1376
  },
  iRZFKEujarikVjpiFAkE: {
    collection: pipe(getCollectionMockById, pick(['slug']))('1aomCtnoesD7WVll6Yi1'),
    tokenId: 2414
  },
  '5SeF1NSN5uPUxtWSr516': {
    collection: pipe(getCollectionMockById, pick(['slug']))('1aomCtnoesD7WVll6Yi1'),
    tokenId: 3035
  },
  QFjMRNChUAHNswkRADXh: {
    collection: pipe(getCollectionMockById, pick(['slug']))('Rc8pLQXxgyQGIRL0fr13'),
    tokenId: 17
  },
  XiDa6k2P7gxXCKSxn2wq: {
    collection: pipe(getCollectionMockById, pick(['slug']))('Rc8pLQXxgyQGIRL0fr13'),
    tokenId: 18
  },
  kRE3UCfXWkJ33nwzj2X1: {
    collection: pipe(getCollectionMockById, pick(['slug']))('Rc8pLQXxgyQGIRL0fr13'),
    tokenId: 1014
  }
}

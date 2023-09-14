import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection-mock'

export const getNftCollectionMockById = (id: string) => nftCollectionMock[id]!

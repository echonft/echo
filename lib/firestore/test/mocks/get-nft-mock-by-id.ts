import { nftMock } from '@echo/firestore-mocks/nft-mock'

export const getNftMockById = (id: string) => nftMock[id]!

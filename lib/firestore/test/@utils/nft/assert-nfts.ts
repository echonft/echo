import { getAllNfts } from '@echo/firestore-test/nft/get-all-nfts'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertNfts() {
  const documents = await getAllNfts()
  expect(contentEq(documents, getAllNftMocks())).toBeTruthy()
}

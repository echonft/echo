import { getAllNfts } from '@echo/firestore-test/nft/get-all-nfts'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertNfts() {
  const documents = await getAllNfts()
  expect(eqListContent(documents, getAllNftMocks())).toBeTruthy()
}

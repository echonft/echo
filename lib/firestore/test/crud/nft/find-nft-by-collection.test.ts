import { findNftByCollection } from '@echo/firestore/crud/nft/find-nft-by-collection'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftByCollection', () => {
  const collection = getCollectionMockById('1aomCtnoesD7WVll6Yi1')

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the token id is not found', async () => {
    const nft = await findNftByCollection({ collection, tokenId: 1 })
    expect(nft).toBeUndefined()
  })

  it('returns the nft with the given collection and token id', async () => {
    const nft = await findNftByCollection({ collection, tokenId: 1376 })
    expect(nft).toStrictEqual(getNftMockById('8hHFadIrrooORfTOLkBg'))
  })
})

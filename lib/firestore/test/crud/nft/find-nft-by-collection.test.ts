import { findNftByCollection } from '@echo/firestore/crud/nft/find-nft-by-collection'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft - findNftByCollection', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await findNftByCollection('not-found', 1376)
    expect(collection).toBeUndefined()
  })

  it('returns undefined if the token id is not found', async () => {
    const collection = await findNftByCollection('spiral-frequencies', 1)
    expect(collection).toBeUndefined()
  })

  it('returns the nft with the given collection and token id', async () => {
    const collection = await findNftByCollection('spiral-frequencies', 1376)
    expect(collection).toStrictEqual(getNftMockById('8hHFadIrrooORfTOLkBg'))
  })
})

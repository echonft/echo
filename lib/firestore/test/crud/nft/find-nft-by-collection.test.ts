import { findNftByCollection } from '../../../src/crud/nft/find-nft-by-collection'
import { getNftMockById } from '../../mocks/get-nft-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftByCollection', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

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

import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { nftMock } from '@echo/firestore-mocks/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft - findNftById', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the nft is not found', async () => {
    const nft = await findNftById('not-found')
    expect(nft).toBeUndefined()
  })

  it('returns the nft with the given id', async () => {
    const collection = await findNftById('8hHFadIrrooORfTOLkBg')
    expect(collection).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})

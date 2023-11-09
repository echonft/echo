import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { nftMock } from '@echo/model-mocks/nft/nft-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

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

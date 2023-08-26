import { findNftById } from '../../../src/crud/nft/find-nft-by-id'
import { nftMock } from '../../mocks/nft-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftById', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the nft is not found', async () => {
    const nft = await findNftById('not-found')
    expect(nft).toBeUndefined()
  })

  it('returns the nft with the given id', async () => {
    const collection = await findNftById('8hHFadIrrooORfTOLkBg')
    expect(collection).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})

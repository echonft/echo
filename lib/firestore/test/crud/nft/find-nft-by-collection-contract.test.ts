import { findNftByCollectionContract } from '../../../src/crud/nft/find-nft-by-collection-contract'
import { nftMock } from '../../mocks/nft-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - findNftByCollectionContract', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the collection is not found', async () => {
    const collection = await findNftByCollectionContract('not-found', 1, 1376)
    expect(collection).toBeUndefined()
  })

  it('returns undefined if the token id is not found', async () => {
    const collection = await findNftByCollectionContract('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1, 1)
    expect(collection).toBeUndefined()
  })

  it('returns the nft with the given collection and token id', async () => {
    const collection = await findNftByCollectionContract('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1, 1376)
    expect(collection).toStrictEqual(nftMock['8hHFadIrrooORfTOLkBg'])
  })
})

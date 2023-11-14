import { findNftByCollectionContract } from '@echo/firestore/crud/nft/find-nft-by-collection-contract'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('CRUD - nft - findNftByCollectionContract', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection is not found', async () => {
    const collection = await findNftByCollectionContract(toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D'), 1, 1376)
    expect(collection).toBeUndefined()
  })

  it('returns undefined if the token id is not found', async () => {
    const collection = await findNftByCollectionContract(toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'), 1, 1)
    expect(collection).toBeUndefined()
  })

  it('returns the nft with the given collection and token id', async () => {
    const collection = await findNftByCollectionContract(toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'), 1, 1376)
    expect(collection).toStrictEqual(getNftMockById('8hHFadIrrooORfTOLkBg'))
  })
})

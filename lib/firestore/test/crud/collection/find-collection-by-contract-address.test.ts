import { findCollectionByAddress } from '@echo/firestore/crud/collection/find-collection-by-address'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { collectionMock } from '@echo/model-mocks/collection/collection-mock'
import { formatAddress } from '@echo/utils/helpers/format-address'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - collection - findCollectionByAddress', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the collection if the address is wrong', async () => {
    const collection = await findCollectionByAddress(formatAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1), 1)
    expect(collection).toBeUndefined()
  })

  it('returns undefined if the collection if the chain id is wrong', async () => {
    const collection = await findCollectionByAddress(formatAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 1), 0)
    expect(collection).toBeUndefined()
  })

  it('returns the collection with the given contract address and chain id', async () => {
    const collection = await findCollectionByAddress(formatAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 1), 1)
    expect(collection).toStrictEqual(collectionMock.Rc8pLQXxgyQGIRL0fr13)
  })
})

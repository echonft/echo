import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { nftMock } from '@echo/firestore-mocks/nft-mock'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { omit } from 'ramda'

describe('CRUD - nft - addNft', () => {
  let id: string
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  afterEach(async () => {
    try {
      await deleteNft(id)
    } catch (_err) {
      // collection was never created, test must have failed
    }
  })

  it('addNft', async () => {
    const originalNft = omit(['id'], nftMock['8hHFadIrrooORfTOLkBg']!)
    id = await addNft(originalNft)
    const nft = await findNftById(id)
    expect(omit(['id'], nft)).toStrictEqual(originalNft)
  })
})

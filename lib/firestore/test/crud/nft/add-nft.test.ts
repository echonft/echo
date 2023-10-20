import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { assertNfts } from '@test-utils/nft/assert-nfts'
import { deleteNft } from '@test-utils/nft/delete-nft'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { omit } from 'ramda'

describe('CRUD - nft - addNft', () => {
  let nftId: string
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertNfts()
    await tearDownRemoteFirestoreTests()
  })

  afterEach(async () => {
    try {
      await deleteNft(nftId)
    } catch (err) {
      throw Error(`error deleting nft ${nftId}: ${errorMessage(err)}`)
    }
  })

  it('addNft', async () => {
    const originalNft = omit(['id', 'updatedAt'], getNftMockById('8hHFadIrrooORfTOLkBg'))
    const addedNft = await addNft(originalNft)
    nftId = addedNft.id
    const nft = await findNftById(nftId)
    expect(omit(['id', 'updatedAt'], nft)).toStrictEqual(originalNft)
  })
})

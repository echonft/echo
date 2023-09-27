import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { nftMock } from '@echo/firestore-mocks/nft/nft-mock'
import { errorMessage } from '@echo/utils/error/error-message'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { assertNfts } from '@test-utils/nft/assert-nfts'
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
    const originalNft = omit(['id'], nftMock['8hHFadIrrooORfTOLkBg']!)
    nftId = await addNft(originalNft)
    const nft = await findNftById(nftId)
    expect(omit(['id'], nft)).toStrictEqual(originalNft)
  })
})

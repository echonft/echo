import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { assertNfts } from '@echo/firestore/utils/nft/assert-nfts'
import { unchecked_updateNft } from '@echo/firestore/utils/nft/unchecked_update-nft'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - nft - setNftOwner', () => {
  let nftId: Nullable<string>
  beforeAll(async () => {
    await assertNfts()
  })
  afterAll(async () => {
    await assertNfts()
  })
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(nftId)) {
      await unchecked_updateNft(getNftMockById(nftId))
    }
  })
  it('throws if the NFT does not exist', async () => {
    const owner = getUserMockByUsername(userMockJohnnyUsername())
    await expect(setNftOwner({ nft: { collection: { slug: 'not-found' }, tokenId: 0 }, owner })).rejects.toEqual(
      Error(NftError.NFT_NOT_FOUND)
    )
  })
  it('updates the NFT with the new owner', async () => {
    const owner = getUserMockByUsername(userMockCrewUsername())
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    await setNftOwner({ nft: getNftIndex(nft), owner })
    const updatedNft = await getNftById(nftId)
    expect(updatedNft).toBeDefined()
    expect(updatedNft?.owner).toStrictEqual(owner)
  })
})

import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { resetNft } from '@echo/test/firestore/crud/nft/reset-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - nft - setNftOwner', () => {
  let nftId: Nullable<string>
  beforeEach(() => {
    nftId = undefined
  })
  afterEach(async () => {
    if (!isNil(nftId)) {
      const nft = getNftMockById(nftId)
      await resetNft(nft)
    }
  })
  it('throws if the NFT does not exist', async () => {
    const owner = getUserMockByUsername(userMockJohnnyUsername())
    await expect(setNftOwner({ nft: { collection: { slug: 'not-found' }, tokenId: 0 }, owner })).rejects.toEqual(
      Error(NftError.NotFound)
    )
  })
  it('updates the NFT with the new owner', async () => {
    const owner = getUserMockByUsername(userMockCrewUsername())
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    await setNftOwner({ nft: nftIndex(nft), owner })
    const updatedNft = await getNftById(nftId)
    expect(updatedNft).toBeDefined()
    expect(updatedNft?.owner).toStrictEqual(owner)
  })
})

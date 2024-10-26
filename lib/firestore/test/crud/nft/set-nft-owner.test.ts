import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { nftMockSpiral1, nftOwnerMockJohnny } from '@echo/model/mocks/nft-mock'
import { userMockCrew } from '@echo/model/mocks/user-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import type { NftOwner } from '@echo/model/types/nft'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import { resetNft } from '@echo/test/firestore/crud/nft/reset-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil } from 'ramda'

describe('CRUD - nft - setNftOwner', () => {
  let nft: Nullable<OwnedNft>

  beforeEach(() => {
    nft = undefined
  })
  afterEach(async () => {
    if (!isNil(nft)) {
      await resetNft(nft)
    }
  })

  it('throws if the NFT does not exist', async () => {
    const owner = nftOwnerMockJohnny
    await expect(setNftOwner({ nft: { collection: { slug: 'not-found' }, tokenId: 0 }, owner })).rejects.toEqual(
      Error(NftError.NotFound)
    )
  })

  it('updates the NFT with the new owner', async () => {
    const owner: NftOwner = assoc('wallet', walletMockCrew.address, userMockCrew)
    nft = nftMockSpiral1
    await setNftOwner({ nft: nftIndex(nft), owner })
    const updatedNft = await getNftByIndex(nft)
    expect(updatedNft).toBeDefined()
    expect(updatedNft?.owner).toStrictEqual(owner)
  })
})

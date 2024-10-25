import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import { resetNft } from '@echo/test/firestore/crud/nft/reset-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, pipe } from 'ramda'

describe('CRUD - nft - removeNftOwner', () => {
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
    await expect(removeNftOwner({ collection: { slug: 'not-found' }, tokenId: 0 })).rejects.toEqual(
      Error(NftError.NotFound)
    )
  })
  it('removes the NFT owner', async () => {
    nft = nftMockSpiral1
    await pipe(nftIndex, removeNftOwner)(nft)
    const updatedNft = await getNftByIndex(nft)
    expect(updatedNft).toBeDefined()
    expect(updatedNft?.owner).toBeUndefined()
  })
})

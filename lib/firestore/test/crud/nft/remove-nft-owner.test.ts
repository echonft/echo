import { NftError } from '@echo/firestore/constants/errors/nft/nft-error'
import { getNftById } from '@echo/firestore/crud/nft/get-nft-by-id'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { assertNfts } from '@echo/firestore/utils/nft/assert-nfts'
import { unchecked_updateNft } from '@echo/firestore/utils/nft/unchecked_update-nft'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil, pipe } from 'ramda'

describe('CRUD - nft - removeNftOwner', () => {
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
    await expect(removeNftOwner({ collection: { slug: 'not-found' }, tokenId: 0 })).rejects.toEqual(
      Error(NftError.NFT_NOT_FOUND)
    )
  })
  it('removes the NFT owner', async () => {
    nftId = nftMockSpiralJohnnyId()
    const nft = getNftMockById(nftId)
    await pipe(getNftIndex, removeNftOwner)(nft)
    const updatedNft = await getNftById(nftId)
    expect(updatedNft).toBeDefined()
    expect(updatedNft?.owner).toBeUndefined()
  })
})

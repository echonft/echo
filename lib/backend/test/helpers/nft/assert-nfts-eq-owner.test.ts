import { assertNftsEqOwner } from '@echo/backend/helpers/nft/assert-nfts-eq-owner'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import { describe, expect, test } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - nft - assertNftsEqOwner', () => {
  const ownedNft = nftMockSpiral1
  const differentOwnerNft: OwnedNft = assoc('owner', assoc('username', 'other-username', ownedNft.owner), ownedNft)

  test('does not throw if all the NFTs in the list have the same owner', () => {
    expect(() => {
      assertNftsEqOwner([ownedNft, ownedNft, ownedNft, ownedNft, ownedNft])
    }).not.toThrow()
  })
  test('throws if the NFTs in the list do not all have the same owner', () => {
    expect(() => {
      assertNftsEqOwner([ownedNft, ownedNft, differentOwnerNft, ownedNft, ownedNft, ownedNft])
    }).toThrow()
    expect(() => {
      assertNftsEqOwner([ownedNft, ownedNft, differentOwnerNft, ownedNft, ownedNft, ownedNft, differentOwnerNft])
    }).toThrow()
  })
})

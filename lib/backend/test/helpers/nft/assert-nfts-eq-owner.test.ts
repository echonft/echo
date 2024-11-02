import { assertNftsEqOwner } from '@echo/backend/helpers/nft/assert-nfts-eq-owner'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { OwnedNft } from '@echo/model/types/nft'
import { describe, expect, test } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - nft - assertNftsEqOwner', () => {
  const ownedNft = nftMockSpiral1
  const owner = nftMockSpiral1.owner.username
  const differentOwnerNft: OwnedNft = assoc('owner', assoc('username', 'other-username', ownedNft.owner), ownedNft)

  test('does not throw if all the NFTs in the list have the owner passed as argument', () => {
    expect(() => {
      assertNftsEqOwner(owner)([ownedNft, ownedNft, ownedNft, ownedNft, ownedNft])
    }).not.toThrow()
  })
  test('throws if the NFTs in the list do not all have the owner passed as argument', () => {
    expect(() => {
      assertNftsEqOwner(owner)([ownedNft, ownedNft, differentOwnerNft, ownedNft, ownedNft, ownedNft])
    }).toThrow()
    expect(() => {
      assertNftsEqOwner(owner)([ownedNft, ownedNft, differentOwnerNft, ownedNft, ownedNft, ownedNft, differentOwnerNft])
    }).toThrow()
  })
})

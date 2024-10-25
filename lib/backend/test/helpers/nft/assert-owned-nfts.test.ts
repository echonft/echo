import { assertNftsOwner } from '@echo/backend/helpers/nft/assert-owned-nfts'
import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import type { Nft } from '@echo/model/types/nft'
import { describe, expect, test } from '@jest/globals'
import { dissoc } from 'ramda'

describe('helpers - nft - assertNftsOwner', () => {
  const ownedNft = nftMockSpiral1
  const nft = dissoc('owner', ownedNft) as Nft

  test('does not throw if all the NFTs in the list have an owner', () => {
    expect(() => {
      assertNftsOwner([ownedNft, ownedNft, ownedNft, ownedNft, ownedNft])
    }).not.toThrow()
  })
  test('throws if one or more of the NFTs in the list do not have an owner', () => {
    expect(() => {
      assertNftsOwner([ownedNft, ownedNft, nft, ownedNft, ownedNft, ownedNft])
    }).toThrow()
    expect(() => {
      assertNftsOwner([ownedNft, ownedNft, nft, ownedNft, ownedNft, ownedNft, nft])
    }).toThrow()
  })
})

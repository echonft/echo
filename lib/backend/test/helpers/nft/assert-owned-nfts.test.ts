import { assertNftsOwner } from '@echo/backend/helpers/nft/assert-owned-nfts'
import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { describe, expect, test } from '@jest/globals'
import { dissoc } from 'ramda'

describe('helpers - nft - assertNftsOwner', () => {
  const ownedNft: OwnedNft = getNftMock()
  const nft: Nft = dissoc('owner', ownedNft)

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

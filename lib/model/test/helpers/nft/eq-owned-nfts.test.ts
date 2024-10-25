import { eqOwnedNfts } from '@echo/model/helpers/nft/eq-owned-nfts'
import { nftMockSpiral1, nftMockSpiral2 } from '@echo/model/mocks/nft-mock'

import type { OwnedNft } from '@echo/model/types/owned-nft'
import { describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - nft - eqOwnedNfts', () => {
  it('returns true if the nfts equal', () => {
    const itemsA = [nftMockSpiral1, nftMockSpiral2]
    const itemsB = [nftMockSpiral2, nftMockSpiral1] as OwnedNft[]
    expect(eqOwnedNfts(itemsA, itemsB)).toBeTruthy()
  })
  it('returns false if the nfts are not equal', () => {
    const itemsA = [nftMockSpiral1, nftMockSpiral2] as OwnedNft[]
    const itemsB = [
      assoc(
        'owner',
        {
          discord: {
            avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
            username: 'another-user'
          },
          username: 'another-user',
          wallet: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
        },
        nftMockSpiral1
      ),
      nftMockSpiral2
    ] as OwnedNft[]
    expect(eqOwnedNfts(itemsA, itemsB)).toBeFalsy()
  })
})

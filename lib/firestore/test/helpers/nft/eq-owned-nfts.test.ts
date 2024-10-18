import { eqOwnedNfts } from '@echo/model/helpers/nft/eq-owned-nfts'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnny2Id, nftMockSpiralJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { offerMockFromJohnnycageId } from '@echo/model/mocks/offer/offer-mock'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Wallet } from '@echo/model/types/wallet'
import { Chain } from '@echo/utils/constants/chain'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe, toLower } from 'ramda'

describe('helpers - nft - eqOwnedNfts', () => {
  it('returns true if the nfts equal', () => {
    const itemsA = [getNftMockById(nftMockSpiralJohnnyId()), getNftMockById(nftMockSpiralJohnny2Id())] as OwnedNft[]
    const itemsB = [getNftMockById(nftMockSpiralJohnny2Id()), getNftMockById(nftMockSpiralJohnnyId())] as OwnedNft[]
    expect(eqOwnedNfts(itemsA, itemsB)).toBeTruthy()
  })
  it('returns false if the nfts are not equal', () => {
    const itemsA = [getNftMockById(nftMockSpiralJohnnyId()), getNftMockById(nftMockSpiralJohnny2Id())] as OwnedNft[]
    const itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
            username: offerMockFromJohnnycageId()
          },
          username: offerMockFromJohnnycageId(),
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: Chain.Blast
          } as Wallet
        })
      )(nftMockSpiralJohnnyId()),
      getNftMockById(nftMockSpiralJohnny2Id())
    ] as OwnedNft[]
    expect(eqOwnedNfts(itemsA, itemsB)).toBeFalsy()
  })
})

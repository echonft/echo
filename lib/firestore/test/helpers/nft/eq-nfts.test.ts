import { eqNfts } from '@echo/model/helpers/nft/eq-nfts'
import type { Wallet } from '@echo/model/types/wallet'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { nftMockSpiralJohnny2Id, nftMockSpiralJohnnyId } from '@echo/model-mocks/nft/nft-mock'
import { offerMockFromJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe, toLower } from 'ramda'

describe('helpers - nft - eqNfts', () => {
  it('returns true if the nfts equal', () => {
    const itemsA = [getNftMockById(nftMockSpiralJohnnyId()), getNftMockById(nftMockSpiralJohnny2Id())]
    expect(eqNfts(itemsA, itemsA)).toBeTruthy()
    const itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: '',
            username: 'does-not-matter'
          },
          username: userMockJohnnyUsername(),
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: 'ethereum'
          } as Wallet
        })
      )(nftMockSpiralJohnnyId()),
      getNftMockById(nftMockSpiralJohnny2Id())
    ]
    expect(eqNfts(itemsA, itemsB)).toBeTruthy()
  })
  it('returns false if the nfts are not equal', () => {
    const itemsA = [getNftMockById(nftMockSpiralJohnnyId()), getNftMockById(nftMockSpiralJohnny2Id())]
    let itemsB = [getNftMockById(nftMockSpiralJohnnyId())]
    expect(eqNfts(itemsA, itemsB)).toBeFalsy()
    itemsB = [
      pipe(getNftMockById, assoc('tokenId', 0))(nftMockSpiralJohnnyId()),
      getNftMockById(nftMockSpiralJohnny2Id())
    ]
    expect(eqNfts(itemsA, itemsB)).toBeFalsy()
  })
  it('using compareOwner', () => {
    const itemsA = [getNftMockById(nftMockSpiralJohnnyId()), getNftMockById(nftMockSpiralJohnny2Id())]
    let itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
            username: offerMockFromJohnnycageId()
          },
          username: 'another-guy',
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: 'ethereum'
          } as Wallet
        })
      )(nftMockSpiralJohnnyId()),
      getNftMockById(nftMockSpiralJohnny2Id())
    ]
    expect(eqNfts(itemsA, itemsB)).toBeTruthy()
    expect(eqNfts(itemsA, itemsB, true)).toBeFalsy()
    itemsB = [
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
            chain: 'blast'
          } as Wallet
        })
      )(nftMockSpiralJohnnyId()),
      getNftMockById(nftMockSpiralJohnny2Id())
    ]
    expect(eqNfts(itemsA, itemsB)).toBeTruthy()
    expect(eqNfts(itemsA, itemsB, true)).toBeFalsy()
  })
})

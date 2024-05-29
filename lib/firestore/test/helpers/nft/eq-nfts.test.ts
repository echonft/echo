import { eqNfts } from '@echo/model/helpers/nft/eq-nfts'
import type { Wallet } from '@echo/model/types/wallet'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NFT_MOCK_SPIRAL_JOHNNY_2_ID, NFT_MOCK_SPIRAL_JOHNNY_ID } from '@echo/model-mocks/nft/nft-mock'
import { OFFER_MOCK_FROM_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { CHAIN_BLAST, CHAIN_ETHEREUM } from '@echo/utils/constants/chains/chains'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe, toLower } from 'ramda'

describe('helpers - nft - eqNfts', () => {
  it('returns true if the nfts equal', () => {
    const itemsA = [getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID), getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)]
    expect(eqNfts(itemsA, itemsA)).toBeTruthy()
    const itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: '',
            username: 'does-not-matter'
          },
          username: USER_MOCK_JOHNNY_USERNAME,
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: CHAIN_ETHEREUM
          } as Wallet
        })
      )(NFT_MOCK_SPIRAL_JOHNNY_ID),
      getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)
    ]
    expect(eqNfts(itemsA, itemsB)).toBeTruthy()
  })
  it('returns false if the nfts are not equal', () => {
    const itemsA = [getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID), getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)]
    let itemsB = [getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID)]
    expect(eqNfts(itemsA, itemsB)).toBeFalsy()
    itemsB = [
      pipe(getNftMockById, assoc('tokenId', 0))(NFT_MOCK_SPIRAL_JOHNNY_ID),
      getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)
    ]
    expect(eqNfts(itemsA, itemsB)).toBeFalsy()
  })
  it('using compareOwner', () => {
    const itemsA = [getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_ID), getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)]
    let itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
            username: OFFER_MOCK_FROM_JOHNNYCAGE_ID
          },
          username: 'another-guy',
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: CHAIN_ETHEREUM
          } as Wallet
        })
      )(NFT_MOCK_SPIRAL_JOHNNY_ID),
      getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)
    ]
    expect(eqNfts(itemsA, itemsB)).toBeTruthy()
    expect(eqNfts(itemsA, itemsB, true)).toBeFalsy()
    itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
            username: OFFER_MOCK_FROM_JOHNNYCAGE_ID
          },
          username: OFFER_MOCK_FROM_JOHNNYCAGE_ID,
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: CHAIN_BLAST
          } as Wallet
        })
      )(NFT_MOCK_SPIRAL_JOHNNY_ID),
      getNftMockById(NFT_MOCK_SPIRAL_JOHNNY_2_ID)
    ]
    expect(eqNfts(itemsA, itemsB)).toBeTruthy()
    expect(eqNfts(itemsA, itemsB, true)).toBeFalsy()
  })
})

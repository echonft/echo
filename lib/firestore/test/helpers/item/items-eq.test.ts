import { eqNfts } from '@echo/model/helpers/nft/eq-nfts'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe, toLower } from 'ramda'

describe('helpers - item - itemsEq', () => {
  it('returns true if the items equal', () => {
    const itemsA = [getNftMockById('8hHFadIrrooORfTOLkBg'), getNftMockById('iRZFKEujarikVjpiFAkE')]
    expect(eqNfts(itemsA, itemsA)).toBeTruthy()
    const itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: '',
            username: 'does-not-matter'
          },
          username: 'johnnycagewins',
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: 'ethereum' as ChainName
          }
        })
      )('8hHFadIrrooORfTOLkBg'),
      getNftMockById('iRZFKEujarikVjpiFAkE')
    ]
    expect(eqNfts(itemsA, itemsB)).toBeTruthy()
  })
  it('returns false if the items are not equal', () => {
    const itemsA = [getNftMockById('8hHFadIrrooORfTOLkBg'), getNftMockById('iRZFKEujarikVjpiFAkE')]
    let itemsB = [getNftMockById('8hHFadIrrooORfTOLkBg')]
    expect(eqNfts(itemsA, itemsB)).toBeFalsy()
    itemsB = [pipe(getNftMockById, assoc('tokenId', 0))('8hHFadIrrooORfTOLkBg'), getNftMockById('iRZFKEujarikVjpiFAkE')]
    expect(eqNfts(itemsA, itemsB)).toBeFalsy()
    itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
            username: 'johnnycagewins'
          },
          username: 'another-guy',
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: 'ethereum' as ChainName
          }
        })
      )('8hHFadIrrooORfTOLkBg'),
      getNftMockById('iRZFKEujarikVjpiFAkE')
    ]
    expect(eqNfts(itemsA, itemsB)).toBeFalsy()
    itemsB = [
      pipe(
        getNftMockById,
        assoc('owner', {
          discord: {
            avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
            username: 'johnnycagewins'
          },
          username: 'johnnycagewins',
          wallet: {
            address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
            chain: 'blast' as ChainName
          }
        })
      )('8hHFadIrrooORfTOLkBg'),
      getNftMockById('iRZFKEujarikVjpiFAkE')
    ]
    expect(eqNfts(itemsA, itemsB)).toBeFalsy()
  })
})

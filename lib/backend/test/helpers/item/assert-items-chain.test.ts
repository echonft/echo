import { assertItemsChain } from '@echo/backend/helpers/item/assert-items-chain'
import { TokenType } from '@echo/model/constants/token-type'
import { nftCollection } from '@echo/model/mappers/nft/nft-collection'
import { collectionMockSpiralId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { Chain } from '@echo/utils/constants/chain'
import { describe, expect, test } from '@jest/globals'
import { assocPath, dissoc, pipe } from 'ramda'

describe('helpers - item - assertItemsChain', () => {
  const creatorUsername = userMockJohnnyUsername()
  const erc721Nft: OwnedNft = {
    attributes: [
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'main', trait: 'Ring' },
      { value: 'movie', trait: 'Animation' },
      { value: '5', trait: 'Speed' },
      { value: 'cumulus', trait: 'Density' },
      { value: '0001', trait: 'Colors' },
      { value: 'random1', trait: 'Palette' },
      { value: '#complement', trait: 'Background' }
    ],
    animationUrl: 'https://animation.url/',
    collection: pipe(collectionMockSpiralId, getCollectionMockById, nftCollection)(),
    tokenIdLabel: '#0001',
    name: 'Spiral Frequencies #1',
    owner: getUserMockByUsername(creatorUsername),
    metadataUrl: 'https://metadata.url/',
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc721
  }
  const erc721Item: Erc721Item = {
    token: {
      contract: erc721Nft.collection.contract,
      animationUrl: 'https://animation.url/',
      collection: dissoc('contract', erc721Nft.collection),
      tokenIdLabel: '#0001',
      name: 'Spiral Frequencies #1',
      metadataUrl: 'https://metadata.url/',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1,
      type: TokenType.Erc721
    }
  }
  test('does not throw if all items are on the same chain', () => {
    expect(() => assertItemsChain([erc721Item, erc721Item, erc721Item, erc721Item])).not.toThrow()
  })
  test('throws if the items are not on all the same chain', () => {
    expect(() =>
      assertItemsChain([
        erc721Item,
        erc721Item,
        erc721Item,
        assocPath(['token', 'contract', 'chain'], Chain.Sei, erc721Item)
      ])
    ).toThrow()
  })
})

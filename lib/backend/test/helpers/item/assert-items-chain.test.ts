import { assertItemsChain } from '@echo/backend/helpers/item/assert-items-chain'

import { collectionMockSpiralId } from '@echo/firestore/test/initialize-db'
import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import type { OwnedNft } from '@echo/model/types/owned-nft'
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
    collection: pipe(collectionMockSpiralId, getCollectionMockById, toNftCollection)(),
    name: 'Spiral Frequencies #1',
    owner: getUserMockByUsername(creatorUsername),
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc721
  }
  const erc721Item: Erc721Item = {
    token: {
      contract: erc721Nft.collection.contract,
      collection: dissoc('contract', erc721Nft.collection),
      name: 'Spiral Frequencies #1',
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

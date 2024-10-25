import { assertUniqErc1155Items } from '@echo/backend/helpers/item/assert-uniq-erc1155-items'

import { collectionMockSpiralId } from '@echo/firestore/test/initialize-db'
import { TokenType } from '@echo/model/constants/token-type'
import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { getUserMockByUsername, userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import type { Erc1155Item } from '@echo/model/types/erc1155-item'
import type { Erc1155Nft } from '@echo/model/types/erc1155-nft'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import type { Erc721Nft } from '@echo/model/types/erc721-nft'
import { describe, expect, test } from '@jest/globals'
import { assocPath, dissoc, pipe } from 'ramda'

describe('helpers - item - assertUniqErc1155Items', () => {
  const erc: Erc721Nft = {
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
    owner: pipe(userMockJohnnyUsername, getUserMockByUsername)(),
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc721
  }
  const erc721Item: Erc721Item = {
    token: {
      contract: erc.collection.contract,
      collection: dissoc('contract', erc.collection),
      name: 'Spiral Frequencies #1',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1,
      type: TokenType.Erc721
    }
  }
  const erc1155Nft: Erc1155Nft = {
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
    owner: pipe(userMockJohnnyUsername, getUserMockByUsername)(),
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc1155
  }
  const erc1155Item: Erc1155Item = {
    token: {
      contract: erc1155Nft.collection.contract,
      collection: dissoc('contract', erc1155Nft.collection),
      name: 'Spiral Frequencies #1',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1,
      type: TokenType.Erc1155
    },
    quantity: 2
  }
  const erc721Item2: Erc721Item = assocPath(['token', 'tokenId'], 2, erc721Item)
  const erc721Item3: Erc721Item = assocPath(['token', 'tokenId'], 3, erc721Item)
  const erc721Item4: Erc721Item = assocPath(['token', 'tokenId'], 4, erc721Item)
  const erc1155Item2: Erc1155Item = assocPath(['token', 'tokenId'], 2, erc1155Item)
  const erc1155Item3: Erc1155Item = assocPath(['token', 'tokenId'], 3, erc1155Item)
  const erc1155Item4: Erc1155Item = assocPath(['token', 'tokenId'], 4, erc1155Item)

  test('does not throw if there are no erc1155 item duplicates in the list', () => {
    expect(() =>
      assertUniqErc1155Items([
        erc721Item,
        erc1155Item,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155Item3,
        erc721Item4,
        erc1155Item4
      ])
    ).not.toThrow()
    expect(() =>
      assertUniqErc1155Items([
        erc721Item,
        erc1155Item,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc721Item3,
        erc1155Item3,
        erc721Item4,
        erc1155Item4
      ])
    ).not.toThrow()
  })

  test('throws if there are one or more erc1155 item duplicates in the list', () => {
    expect(() =>
      assertUniqErc1155Items([
        erc721Item,
        erc1155Item,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155Item2,
        erc1155Item3,
        erc721Item4,
        erc1155Item4
      ])
    ).toThrow()
    expect(() =>
      assertUniqErc1155Items([
        erc1155Item4,
        erc721Item,
        erc1155Item,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155Item,
        erc1155Item3,
        erc721Item4,
        erc1155Item4,
        erc1155Item4
      ])
    ).toThrow()
  })
})

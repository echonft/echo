import { erc721Items } from '@echo/model/helpers/item/erc721-items'
import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'

import type { Erc721Item } from '@echo/model/types/item'
import { describe, expect, test } from '@jest/globals'
import { assocPath } from 'ramda'

describe('helpers - item - erc721Items', () => {
  test('only returns the erc721 items from an item list', () => {
    const erc721Item2: Erc721Item = assocPath(['token', 'tokenId'], 2, erc721ItemMock)
    const erc721Item3: Erc721Item = assocPath(['token', 'tokenId'], 3, erc721ItemMock)
    const erc721Item4: Erc721Item = assocPath(['token', 'tokenId'], 4, erc721ItemMock)
    const items = [
      erc721ItemMock,
      erc1155ItemMock,
      erc1155ItemMock,
      erc721Item2,
      erc721Item3,
      erc20ItemMock,
      erc1155ItemMock,
      erc721Item4,
      erc20ItemMock
    ]
    const filteredItems = erc721Items(items)
    expect(filteredItems.length).toBe(4)
    expect(filteredItems).toEqual([erc721ItemMock, erc721Item2, erc721Item3, erc721Item4])
  })
  test('also works with duplicates', () => {
    const items = [
      erc721ItemMock,
      erc1155ItemMock,
      erc1155ItemMock,
      erc721ItemMock,
      erc721ItemMock,
      erc20ItemMock,
      erc1155ItemMock,
      erc721ItemMock,
      erc20ItemMock
    ]
    const filteredItems = erc721Items(items)
    expect(filteredItems.length).toBe(4)
    expect(filteredItems).toEqual([erc721ItemMock, erc721ItemMock, erc721ItemMock, erc721ItemMock])
  })
})

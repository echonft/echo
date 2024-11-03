import { erc1155Items } from '@echo/model/helpers/item/erc1155-items'
import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import type { Erc1155Item } from '@echo/model/types/item'
import { describe, expect, test } from '@jest/globals'
import { assocPath } from 'ramda'

describe('helpers - item - erc1155Items', () => {
  test('only returns the erc1155 items from an item list', () => {
    const erc1155Item2: Erc1155Item = assocPath(['token', 'tokenId'], 2, erc1155ItemMock)
    const erc1155Item3: Erc1155Item = assocPath(['token', 'tokenId'], 3, erc1155ItemMock)
    const erc1155Item4: Erc1155Item = assocPath(['token', 'tokenId'], 4, erc1155ItemMock)
    const items = [
      erc1155ItemMock,
      erc721ItemMock,
      erc721ItemMock,
      erc1155Item2,
      erc1155Item3,
      erc20ItemMock,
      erc721ItemMock,
      erc1155Item4,
      erc20ItemMock
    ]
    const filteredItems = erc1155Items(items)
    expect(filteredItems.length).toBe(4)
    expect(filteredItems).toEqual([erc1155ItemMock, erc1155Item2, erc1155Item3, erc1155Item4])
  })
  test('also works with duplicates', () => {
    const items = [
      erc1155ItemMock,
      erc721ItemMock,
      erc721ItemMock,
      erc1155ItemMock,
      erc1155ItemMock,
      erc20ItemMock,
      erc721ItemMock,
      erc1155ItemMock,
      erc20ItemMock
    ]
    const filteredItems = erc1155Items(items)
    expect(filteredItems.length).toBe(4)
    expect(filteredItems).toEqual([erc1155ItemMock, erc1155ItemMock, erc1155ItemMock, erc1155ItemMock])
  })
})

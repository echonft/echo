import { erc20Items } from '@echo/model/helpers/item/erc20-items'
import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import type { Erc20Item } from '@echo/model/types/erc20-item'
import { describe, expect, test } from '@jest/globals'
import { assoc } from 'ramda'

describe('helpers - item - erc20Items', () => {
  test('only returns the erc20 items from an item list', () => {
    const erc20Item2: Erc20Item = assoc('quantity', 1, erc20ItemMock)
    const erc20Item3: Erc20Item = assoc('quantity', 2, erc20ItemMock)
    const erc20Item4: Erc20Item = assoc('quantity', 3, erc20ItemMock)
    const items = [
      erc20ItemMock,
      erc721ItemMock,
      erc1155ItemMock,
      erc20Item2,
      erc20Item3,
      erc721ItemMock,
      erc721ItemMock,
      erc20Item4,
      erc1155ItemMock
    ]
    const filteredItems = erc20Items(items)
    expect(filteredItems.length).toBe(4)
    expect(filteredItems).toEqual([erc20ItemMock, erc20Item2, erc20Item3, erc20Item4])
  })

  test('also works with duplicates', () => {
    const items = [
      erc20ItemMock,
      erc721ItemMock,
      erc1155ItemMock,
      erc20ItemMock,
      erc20ItemMock,
      erc721ItemMock,
      erc721ItemMock,
      erc20ItemMock,
      erc1155ItemMock
    ]
    const filteredItems = erc20Items(items)
    expect(filteredItems.length).toBe(4)
    expect(filteredItems).toEqual([erc20ItemMock, erc20ItemMock, erc20ItemMock, erc20ItemMock])
  })
})

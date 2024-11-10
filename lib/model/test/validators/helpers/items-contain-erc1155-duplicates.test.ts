import { erc1155ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import type { Erc1155Item, Erc721Item } from '@echo/model/types/item'
import { itemsContainErc1155Duplicates } from '@echo/model/validators/helpers/items-contain-erc1155-duplicates'
import { describe, expect, test } from '@jest/globals'
import { assocPath } from 'ramda'

describe('itemsContainErc1155Duplicates', () => {
  const erc721Item2: Erc721Item = assocPath(['token', 'tokenId'], 20, erc721ItemMock)
  const erc721Item3: Erc721Item = assocPath(['token', 'tokenId'], 30, erc721ItemMock)
  const erc721Item4: Erc721Item = assocPath(['token', 'tokenId'], 40, erc721ItemMock)
  const erc1155Item2: Erc1155Item = assocPath(['token', 'tokenId'], 20, erc1155ItemMock)
  const erc1155Item3: Erc1155Item = assocPath(['token', 'tokenId'], 30, erc1155ItemMock)
  const erc1155Item4: Erc1155Item = assocPath(['token', 'tokenId'], 40, erc1155ItemMock)

  test('returns FALSE if there are no erc1155 item duplicates in the list', () => {
    expect(
      itemsContainErc1155Duplicates([
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155Item3,
        erc721Item4,
        erc1155Item4
      ])
    ).toBeFalsy()
    expect(
      itemsContainErc1155Duplicates([
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc721Item3,
        erc1155Item3,
        erc721Item4,
        erc1155Item4
      ])
    ).toBeFalsy()
  })

  test('returns TRUE if there are one or more erc1155 item duplicates in the list', () => {
    expect(
      itemsContainErc1155Duplicates([
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155Item2,
        erc1155Item3,
        erc721Item4,
        erc1155Item4
      ])
    ).toBeTruthy()
    expect(
      itemsContainErc1155Duplicates([
        erc1155Item4,
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155ItemMock,
        erc1155Item3,
        erc721Item4,
        erc1155Item4,
        erc1155Item4
      ])
    ).toBeTruthy()
  })
})

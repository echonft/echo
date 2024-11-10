import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import type { Erc1155Item, Erc20Item, Erc721Item } from '@echo/model/types/item'
import { itemsContainErc1155Duplicates } from '@echo/model/validators/helpers/items-contain-erc1155-duplicates'
import { itemsContainErc20Duplicates } from '@echo/model/validators/helpers/items-contain-erc20-duplicates'
import { describe, expect, test } from '@jest/globals'
import { assocPath } from 'ramda'

describe('itemsContainErc20Duplicates', () => {
  const erc721Item2: Erc721Item = assocPath(['token', 'tokenId'], 20, erc721ItemMock)
  const erc721Item3: Erc721Item = assocPath(['token', 'tokenId'], 30, erc721ItemMock)
  const erc721Item4: Erc721Item = assocPath(['token', 'tokenId'], 40, erc721ItemMock)
  const erc1155Item2: Erc1155Item = assocPath(['token', 'tokenId'], 20, erc1155ItemMock)
  const erc1155Item3: Erc1155Item = assocPath(['token', 'tokenId'], 30, erc1155ItemMock)
  const erc1155Item4: Erc1155Item = assocPath(['token', 'tokenId'], 40, erc1155ItemMock)
  const erc20Item2: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract', erc20ItemMock)
  const erc20Item3: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract2', erc20ItemMock)
  const erc20Item4: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract3', erc20ItemMock)

  test('returns FALSE if there are no erc20 item duplicates in the list', () => {
    expect(
      itemsContainErc20Duplicates([
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc20Item3,
        erc1155Item2,
        erc721Item3,
        erc20ItemMock,
        erc1155Item3,
        erc20Item2,
        erc721Item4,
        erc1155Item4,
        erc20Item4
      ])
    ).toBeFalsy()
  })

  test('returns TRUE if there are one or more erc1155 item duplicates in the list', () => {
    expect(
      itemsContainErc20Duplicates([
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc20Item3,
        erc1155Item2,
        erc721Item3,
        erc20ItemMock,
        erc1155Item3,
        erc20Item2,
        erc721Item4,
        erc1155Item4,
        erc20Item4,
        erc20ItemMock
      ])
    ).toBeTruthy()
    expect(
      itemsContainErc1155Duplicates([
        erc20Item2,
        erc1155Item4,
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155ItemMock,
        erc20Item4,
        erc1155Item3,
        erc721Item4,
        erc1155Item4,
        erc1155Item4
      ])
    ).toBeTruthy()
  })
})

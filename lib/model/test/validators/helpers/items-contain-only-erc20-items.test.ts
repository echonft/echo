import { erc1155ItemMock, erc20ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import type { Erc20Item } from '@echo/model/types/item'
import { itemsContainOnlyErc20Items } from '@echo/model/validators/helpers/items-contain-only-erc20-items'
import { describe, expect, test } from '@jest/globals'
import { assocPath } from 'ramda'

describe('itemsContainOnlyErc20Items', () => {
  const erc20Item2: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract', erc20ItemMock)
  const erc20Item3: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract2', erc20ItemMock)
  const erc20Item4: Erc20Item = assocPath(['token', 'contract'], '0xanothercontract3', erc20ItemMock)

  test('returns TRUE if items do not contain any erc721 or erc1155 items', () => {
    expect(itemsContainOnlyErc20Items([erc20ItemMock, erc20Item2, erc20Item3, erc20Item4])).toBeTruthy()
  })

  test('returns FALSE if items contain at least one erc721 or erc1155 item', () => {
    expect(itemsContainOnlyErc20Items([erc20ItemMock, erc20Item2, erc721ItemMock, erc20Item3, erc20Item4])).toBeFalsy()
    expect(itemsContainOnlyErc20Items([erc20ItemMock, erc20Item2, erc20Item3, erc20Item4, erc1155ItemMock])).toBeFalsy()
    expect(
      itemsContainOnlyErc20Items([
        erc721ItemMock,
        erc20ItemMock,
        erc20Item2,
        erc1155ItemMock,
        erc721ItemMock,
        erc20Item3,
        erc20Item4
      ])
    ).toBeFalsy()
  })
})

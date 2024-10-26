import { assertUniqErc721Items } from '@echo/backend/helpers/item/assert-uniq-erc721-items'
import { erc1155ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import type { Erc1155Item } from '@echo/model/types/erc1155-item'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import { describe, expect, test } from '@jest/globals'
import { assocPath } from 'ramda'

describe('helpers - item - assertUniqErc721Items', () => {
  const erc721Item2: Erc721Item = assocPath(['token', 'tokenId'], 2, erc721ItemMock)
  const erc721Item3: Erc721Item = assocPath(['token', 'tokenId'], 3, erc721ItemMock)
  const erc721Item4: Erc721Item = assocPath(['token', 'tokenId'], 4, erc721ItemMock)
  const erc1155Item2: Erc1155Item = assocPath(['token', 'tokenId'], 2, erc1155ItemMock)
  const erc1155Item3: Erc1155Item = assocPath(['token', 'tokenId'], 3, erc1155ItemMock)
  const erc1155Item4: Erc1155Item = assocPath(['token', 'tokenId'], 4, erc1155ItemMock)

  test('does not throw if there are no erc721 item duplicates in the list', () => {
    expect(() =>
      assertUniqErc721Items([
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155Item3,
        erc721Item4,
        erc1155Item4
      ])
    ).not.toThrow()
    expect(() =>
      assertUniqErc721Items([
        erc1155Item4,
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155Item3,
        erc721Item4,
        erc1155Item4,
        erc1155Item4
      ])
    ).not.toThrow()
  })

  test('throws if there are one or more erc721 item duplicates in the list', () => {
    expect(() =>
      assertUniqErc721Items([
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721ItemMock,
        erc721Item3,
        erc1155Item3,
        erc721Item4,
        erc1155Item4
      ])
    ).toThrow()
    expect(() =>
      assertUniqErc721Items([
        erc1155Item4,
        erc721ItemMock,
        erc721ItemMock,
        erc1155ItemMock,
        erc721Item2,
        erc1155Item2,
        erc721Item3,
        erc1155Item3,
        erc721Item3,
        erc721Item4,
        erc1155Item4,
        erc1155Item4
      ])
    ).toThrow()
  })
})

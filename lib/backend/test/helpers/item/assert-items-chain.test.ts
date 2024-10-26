import { assertItemsChain } from '@echo/backend/helpers/item/assert-items-chain'
import { Chain } from '@echo/model/constants/chain'
import { erc721ItemMock } from '@echo/model/mocks/item-mock'
import { describe, expect, test } from '@jest/globals'
import { assocPath } from 'ramda'

describe('helpers - item - assertItemsChain', () => {
  test('does not throw if all items are on the same chain', () => {
    expect(() => assertItemsChain([erc721ItemMock, erc721ItemMock, erc721ItemMock, erc721ItemMock])).not.toThrow()
  })
  test('throws if the items are not on all the same chain', () => {
    expect(() =>
      assertItemsChain([
        erc721ItemMock,
        erc721ItemMock,
        erc721ItemMock,
        assocPath(['token', 'contract', 'chain'], Chain.Sei, erc721ItemMock)
      ])
    ).toThrow()
  })
})

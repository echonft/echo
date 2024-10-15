import type { ItemRequest, ItemsRequest } from '@echo/api/types/requests/item-request'
import { itemsSchema } from '@echo/api/validators/items-schema'
import { erc1155TokenType, erc20TokenType, erc721TokenType } from '@echo/model/constants/token-types'
import type { Erc1155TokenIndex, Erc20TokenIndex, Erc721TokenIndex } from '@echo/model/types/token'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, dissocPath, forEach, toLower } from 'ramda'

describe('validators - itemsSchema', () => {
  const erc20TokenItemRequest: ItemRequest<Erc20TokenIndex> = {
    token: {
      type: erc20TokenType,
      contract: {
        address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc'),
        chain: 'blast'
      }
    },
    quantity: 10
  }
  const erc721TokenItemRequest: ItemRequest<Erc721TokenIndex> = {
    token: {
      type: erc721TokenType,
      collection: {
        slug: 'erc721-collection-slug'
      },
      tokenId: 1
    },
    quantity: 1
  }
  const erc1155TokenItemRequest: ItemRequest<Erc1155TokenIndex> = {
    token: {
      type: erc1155TokenType,
      collection: {
        slug: 'erc1155-collection-slug'
      },
      tokenId: 1
    },
    quantity: 5
  }

  it('invalid', () => {
    const values = [undefined, null, '', {}, { erc20: [], erc721: [], erc1155: [] }]
    forEach((value) => {
      expect(() => itemsSchema.parse(value)).toThrow()
    }, values)
  })
  it('invalid when any item list contains an invalid value', () => {
    const values: ItemsRequest[] = [
      {
        erc20: [assoc('quantity', 0, erc20TokenItemRequest)],
        erc721: [erc721TokenItemRequest],
        erc1155: [erc1155TokenItemRequest]
      },
      {
        erc20: [assocPath(['token', 'type'], erc721TokenType, erc20TokenItemRequest)],
        erc721: [erc721TokenItemRequest],
        erc1155: [erc1155TokenItemRequest]
      },
      {
        erc20: [dissocPath(['token', 'contract'], erc20TokenItemRequest)],
        erc721: [erc721TokenItemRequest],
        erc1155: [erc1155TokenItemRequest]
      },
      {
        erc20: [erc20TokenItemRequest],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        erc721: [assoc('quantity', 2, erc721TokenItemRequest)],
        erc1155: [erc1155TokenItemRequest]
      },
      {
        erc20: [erc20TokenItemRequest],
        erc721: [assocPath(['token', 'type'], erc1155TokenType, erc721TokenItemRequest)],
        erc1155: [erc1155TokenItemRequest]
      },
      {
        erc20: [erc20TokenItemRequest],
        erc721: [dissocPath(['token', 'collection', 'slug'], erc721TokenItemRequest)],
        erc1155: [erc1155TokenItemRequest]
      },
      {
        erc20: [erc20TokenItemRequest],
        erc721: [erc721TokenItemRequest],
        erc1155: [assoc('quantity', 0, erc1155TokenItemRequest)]
      },
      {
        erc20: [erc20TokenItemRequest],
        erc721: [erc721TokenItemRequest],
        erc1155: [assocPath(['token', 'type'], erc721TokenType, erc1155TokenItemRequest)]
      },
      {
        erc20: [erc20TokenItemRequest],
        erc721: [erc721TokenItemRequest],
        erc1155: [dissocPath(['token', 'collection', 'slug'], erc1155TokenItemRequest)]
      }
    ]
    forEach((value) => {
      expect(() => itemsSchema.parse(value)).toThrow()
    }, values)
  })
  it('invalid when there are only ERC20 token items', () => {
    const items: ItemsRequest = {
      erc20: [erc20TokenItemRequest],
      erc721: [],
      erc1155: []
    }
    expect(() => itemsSchema.parse(items)).toThrow()
  })
  it('valid', () => {
    const items: ItemsRequest = {
      erc20: [erc20TokenItemRequest],
      erc721: [erc721TokenItemRequest],
      erc1155: [erc1155TokenItemRequest]
    }
    expect(itemsSchema.parse(items)).toStrictEqual(items)
  })
})

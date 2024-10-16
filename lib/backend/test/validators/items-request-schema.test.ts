import type { ItemRequest, ItemsRequest } from '@echo/api/types/requests/item-request'
import { itemsRequestSchema } from '@echo/backend/validators/items-request-schema'
import { TokenType } from '@echo/model/constants/token-type'
import type { Erc1155TokenIndex } from '@echo/model/types/token/erc1155-token'
import type { Erc20TokenIndex } from '@echo/model/types/token/erc20-token'
import type { Erc721TokenIndex } from '@echo/model/types/token/erc721-token'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, dissocPath, forEach, toLower } from 'ramda'

describe('validators - itemsRequestSchema', () => {
  const erc20TokenItemRequest: ItemRequest<Erc20TokenIndex> = {
    token: {
      type: TokenType.Erc20,
      contract: {
        address: toLower('0x12c63bbD266dB84e117356e664f3604055166CEc'),
        chain: 'blast'
      }
    },
    quantity: 10
  }
  const erc721TokenItemRequest: ItemRequest<Erc721TokenIndex> = {
    token: {
      type: TokenType.Erc721,
      collection: {
        slug: 'erc721-collection-slug'
      },
      tokenId: 1
    },
    quantity: 1
  }
  const erc1155TokenItemRequest: ItemRequest<Erc1155TokenIndex> = {
    token: {
      type: TokenType.Erc1155,
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
      expect(() => itemsRequestSchema.parse(value)).toThrow()
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
        erc20: [assocPath(['token', 'type'], TokenType.Erc721, erc20TokenItemRequest)],
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
        erc721: [assocPath(['token', 'type'], TokenType.Erc1155, erc721TokenItemRequest)],
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
        erc1155: [assocPath(['token', 'type'], TokenType.Erc721, erc1155TokenItemRequest)]
      },
      {
        erc20: [erc20TokenItemRequest],
        erc721: [erc721TokenItemRequest],
        erc1155: [dissocPath(['token', 'collection', 'slug'], erc1155TokenItemRequest)]
      }
    ]
    forEach((value) => {
      expect(() => itemsRequestSchema.parse(value)).toThrow()
    }, values)
  })
  it('invalid when there are only ERC20 token items', () => {
    const items: ItemsRequest = {
      erc20: [erc20TokenItemRequest],
      erc721: [],
      erc1155: []
    }
    expect(() => itemsRequestSchema.parse(items)).toThrow()
  })
  it('valid', () => {
    const items: ItemsRequest = {
      erc20: [erc20TokenItemRequest],
      erc721: [erc721TokenItemRequest],
      erc1155: [erc1155TokenItemRequest]
    }
    expect(itemsRequestSchema.parse(items)).toStrictEqual(items)
  })
})

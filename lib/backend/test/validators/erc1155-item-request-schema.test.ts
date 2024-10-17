import type { Erc1155ItemRequest } from '@echo/api/types/requests/erc1155-item-request'
import { erc1155ItemRequestSchema } from '@echo/backend/validators/erc1155-item-request-schema'
import { TokenType } from '@echo/model/constants/token-type'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, dissoc, dissocPath, forEach, pipe } from 'ramda'

describe('validators - erc1155ItemRequestSchema', () => {
  const erc1155ItemRequest: Erc1155ItemRequest = {
    token: {
      type: TokenType.Erc1155,
      collection: {
        slug: 'erc721-collection-slug'
      },
      tokenId: 1
    },
    quantity: 1
  }
  it('invalid', () => {
    const values = [undefined, null, '', {}, { token: {}, quantity: 1 }]
    forEach((value) => {
      expect(() => erc1155ItemRequestSchema.parse(value)).toThrow()
    }, values)
  })
  it('invalid when type is wrong or missing', () => {
    let request = dissocPath(['token', 'type'], erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], TokenType.Erc721)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], TokenType.Erc20)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], null)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], undefined)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], '')
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], 'ERC721')
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when collection slug is wrong or missing', () => {
    let request = dissocPath(['token', 'collection', 'slug'], erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], '')
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], '!slug@')
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], 'slug with spaces')
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], null)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], undefined)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when collection is wrong or missing', () => {
    let request = dissocPath(['token', 'collection'], erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], '')
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], {})
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], { sluggy: 'valid-slug' })
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(
      ['token', 'collection'],
      { contract: { address: '0x1234567890', chain: 'blast' } },
      erc1155ItemRequest
    )
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], null)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], undefined)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when token id is wrong or missing', () => {
    let request = dissocPath(['token', 'tokenId'], erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'tokenId'], '')
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'tokenId'], {})
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'tokenId'], 0)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'tokenId'], -10, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], null)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], undefined)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when token is wrong or missing', () => {
    let request = dissoc('token', erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', '', erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', {}, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', 1, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', null, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', undefined, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = pipe(dissoc('token'), assoc('token1', erc1155ItemRequest.token))(erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when quantity is wrong or missing', () => {
    let request = dissoc('quantity', erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('quantity', '', erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('quantity', {}, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('quantity', -10, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('quantity', 0.01, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('quantity', null, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = assoc('quantity', undefined, erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
    request = pipe(dissoc('quantity'), assoc('quantity_', 1))(erc1155ItemRequest)
    expect(() => erc1155ItemRequestSchema.parse(request)).toThrow()
  })
  it('valid', () => {
    expect(erc1155ItemRequestSchema.parse(erc1155ItemRequest)).toStrictEqual(erc1155ItemRequest)
  })
})

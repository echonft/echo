import type { Erc721ItemRequest } from '@echo/api/types/requests/erc721-item-request'
import { erc721ItemRequestSchema } from '@echo/backend/validators/erc721-item-request-schema'
import { TokenType } from '@echo/model/constants/token-type'
import { Chain } from '@echo/utils/constants/chain'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, dissoc, dissocPath, forEach, pipe } from 'ramda'

describe('validators - erc721ItemRequestSchema', () => {
  const erc721ItemRequest: Erc721ItemRequest = {
    token: {
      type: TokenType.Erc721,
      collection: {
        slug: 'erc721-collection-slug'
      },
      tokenId: 1
    }
  }
  it('invalid', () => {
    const values = [undefined, null, '', {}, { token: {} }]
    forEach((value) => {
      expect(() => erc721ItemRequestSchema.parse(value)).toThrow()
    }, values)
  })
  it('invalid when type is wrong or missing', () => {
    let request = dissocPath(['token', 'type'], erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], TokenType.Erc1155)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], TokenType.Erc20)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], null)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], undefined)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], '')
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'type'], 'ERC721')
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when collection slug is wrong or missing', () => {
    let request = dissocPath(['token', 'collection', 'slug'], erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], '')
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], '!slug@')
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], 'slug with spaces')
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], null)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection', 'slug'], undefined)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when collection is wrong or missing', () => {
    let request = dissocPath(['token', 'collection'], erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], '')
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], {})
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], { sluggy: 'valid-slug' })
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(
      ['token', 'collection'],
      { contract: { address: '0x1234567890', chain: Chain.Blast } },
      erc721ItemRequest
    )
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], null)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], undefined)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when token id is wrong or missing', () => {
    let request = dissocPath(['token', 'tokenId'], erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'tokenId'], '')
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'tokenId'], {})
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'tokenId'], 0)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'tokenId'], -10, erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], null)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assocPath(['token', 'collection'], undefined)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
  })
  it('invalid when token is wrong or missing', () => {
    let request = dissoc('token', erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', '', erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', {}, erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', 1, erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', null, erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = assoc('token', undefined, erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
    request = pipe(dissoc('token'), assoc('token1', erc721ItemRequest.token))(erc721ItemRequest)
    expect(() => erc721ItemRequestSchema.parse(request)).toThrow()
  })
  it('valid', () => {
    expect(erc721ItemRequestSchema.parse(erc721ItemRequest)).toStrictEqual(erc721ItemRequest)
  })
})

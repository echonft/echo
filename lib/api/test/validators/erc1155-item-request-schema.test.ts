import type { Erc1155ItemRequest } from '@echo/api/types/requests/erc1155-item-request'
import { erc1155ItemRequestSchema } from '@echo/api/validators/erc1155-item-request-schema'
import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import { describe, expect, it } from '@jest/globals'

import { assoc, assocPath, dissoc, dissocPath, forEach, head, pipe, prop } from 'ramda'
import { ZodIssueCode } from 'zod'

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

  function expectZodError(data: unknown, code: ZodIssueCode, message?: string) {
    try {
      erc1155ItemRequestSchema.parse(data)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      expect(() => {}).toThrow()
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), head, prop('code'))(err)).toBe(code)
      if (message) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), head, prop('message'))(err)).toBe(message)
      }
    }
  }

  it('invalid', () => {
    const values = [undefined, null, '', {}, { token: {}, quantity: 1 }]
    forEach((value) => {
      expectZodError(value, ZodIssueCode.invalid_type)
    }, values)
  })
  it('invalid when type is wrong or missing', () => {
    let request = dissocPath(['token', 'type'], erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_literal)
    request = assocPath(['token', 'type'], TokenType.Erc721)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'type'], TokenType.Erc20)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'type'], null)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'type'], undefined)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'type'], '')
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'type'], 'ERC721')
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('invalid when collection slug is wrong or missing', () => {
    let request = dissocPath(['token', 'collection', 'slug'], erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection', 'slug'], '')
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection', 'slug'], '!slug@')
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection', 'slug'], 'slug with spaces')
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection', 'slug'], null)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection', 'slug'], undefined)
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('invalid when collection is wrong or missing', () => {
    let request = dissocPath(['token', 'collection'], erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], '')
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], {})
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], { sluggy: 'valid-slug' })
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(
      ['token', 'collection'],
      { contract: { address: '0x1234567890', chain: Chain.Blast } },
      erc1155ItemRequest
    )
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], null)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], undefined)
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('invalid when token id is wrong or missing', () => {
    let request = dissocPath(['token', 'tokenId'], erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'tokenId'], '')
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'tokenId'], {})
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'tokenId'], 0)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'tokenId'], -10, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.too_small)
    request = assocPath(['token', 'collection'], null)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], undefined)
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('invalid when token is wrong or missing', () => {
    let request = dissoc('token', erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', '', erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', {}, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', 1, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', null, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', undefined, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = pipe(dissoc('token'), assoc('token1', erc1155ItemRequest.token))(erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('invalid when quantity is wrong or missing', () => {
    let request = dissoc('quantity', erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('quantity', '', erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('quantity', {}, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('quantity', -10, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.too_small)
    request = assoc('quantity', 0.01, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('quantity', null, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('quantity', undefined, erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = pipe(dissoc('quantity'), assoc('quantity_', 1))(erc1155ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('valid', () => {
    expect(erc1155ItemRequestSchema.parse(erc1155ItemRequest)).toStrictEqual(erc1155ItemRequest)
  })
})

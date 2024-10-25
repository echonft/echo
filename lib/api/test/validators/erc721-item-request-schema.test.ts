import type { Erc721ItemRequest } from '@echo/api/types/requests/erc721-item-request'
import { erc721ItemRequestSchema } from '@echo/api/validators/erc721-item-request-schema'
import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, dissoc, dissocPath, forEach, head, pipe, prop } from 'ramda'
import { ZodIssueCode } from 'zod'

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

  function expectZodError(data: unknown, code: ZodIssueCode, message?: string) {
    try {
      erc721ItemRequestSchema.parse(data)
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
    const values = [undefined, null, '', {}, { token: {} }]
    forEach((value) => {
      expectZodError(value, ZodIssueCode.invalid_type)
    }, values)
  })
  it('invalid when type is wrong or missing', () => {
    let request = dissocPath(['token', 'type'], erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_literal)
    request = assocPath(['token', 'type'], TokenType.Erc1155)
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
    let request = dissocPath(['token', 'collection', 'slug'], erc721ItemRequest)
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
    let request = dissocPath(['token', 'collection'], erc721ItemRequest)
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
      erc721ItemRequest
    )
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], null)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], undefined)
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('invalid when token id is wrong or missing', () => {
    let request = dissocPath(['token', 'tokenId'], erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'tokenId'], '')
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'tokenId'], {})
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'tokenId'], 0)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'tokenId'], -10, erc721ItemRequest)
    expectZodError(request, ZodIssueCode.too_small)
    request = assocPath(['token', 'collection'], null)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assocPath(['token', 'collection'], undefined)
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('invalid when token is wrong or missing', () => {
    let request = dissoc('token', erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', '', erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', {}, erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', 1, erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', null, erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = assoc('token', undefined, erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
    request = pipe(dissoc('token'), assoc('token1', erc721ItemRequest.token))(erc721ItemRequest)
    expectZodError(request, ZodIssueCode.invalid_type)
  })
  it('valid', () => {
    expect(erc721ItemRequestSchema.parse(erc721ItemRequest)).toStrictEqual(erc721ItemRequest)
  })
})

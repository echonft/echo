import { TokenType } from '@echo/model/constants/token-type'
import { tokenTypeSchema } from '@echo/model/validators/token-type-schema'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('tokenTypeSchema', () => {
  it('invalid', () => {
    const values = [undefined, null, '', 10, {}]
    forEach((value) => {
      expect(() => tokenTypeSchema.parse(value)).toThrow()
    }, values)
  })
  it('valid', () => {
    const values = [TokenType.Erc20, TokenType.Erc721, TokenType.Erc1155]
    forEach((value) => {
      expect(tokenTypeSchema.parse(value)).toStrictEqual(value)
    }, values)
  })
})

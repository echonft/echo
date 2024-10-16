import { TokenType } from '@echo/model/constants/token-type'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('validators - nftTokenTypeSchema', () => {
  it('invalid', () => {
    const values = [undefined, null, '', 10, TokenType.Erc20]
    forEach((value) => {
      expect(() => nftTokenTypeSchema.parse(value)).toThrow()
    }, values)
  })
  it('valid', () => {
    const values = [TokenType.Erc721, TokenType.Erc1155]
    forEach((value) => {
      expect(nftTokenTypeSchema.parse(value)).toStrictEqual(value)
    }, values)
  })
})

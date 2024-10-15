import { erc1155TokenType, erc20TokenType, erc721TokenType } from '@echo/model/constants/token-types'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('validators - nftTokenTypeSchema', () => {
  it('invalid', () => {
    const values = [undefined, null, '', 10, erc20TokenType]
    forEach((value) => {
      expect(() => nftTokenTypeSchema.parse(value)).toThrow()
    }, values)
  })
  it('valid', () => {
    const values = [erc721TokenType, erc1155TokenType]
    forEach((value) => {
      expect(nftTokenTypeSchema.parse(value)).toStrictEqual(value)
    }, values)
  })
})

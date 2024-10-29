import { bigIntStringSchema } from '@echo/model/validators/big-int-string-schema'
import { describe, expect, it } from '@jest/globals'

describe('bigIntStringSchema', () => {
  it('invalid', () => {
    expect(() => bigIntStringSchema.parse(undefined)).toThrow()
    expect(() => bigIntStringSchema.parse(null)).toThrow()
    expect(() => bigIntStringSchema.parse('')).toThrow()
    expect(() => bigIntStringSchema.parse('asdasdsa')).toThrow()
    expect(() => bigIntStringSchema.parse('0xsss')).toThrow()
  })
  it('valid', () => {
    const value = BigInt(100)
    const validString = value.toString(10)
    expect(bigIntStringSchema.parse(validString)).toEqual(Number(value))
  })
})

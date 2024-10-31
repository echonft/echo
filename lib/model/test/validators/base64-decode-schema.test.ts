import { base64DecodeSchema } from '@echo/model/validators/base64-decode-schema'
import { base64Encode } from '@echo/utils/helpers/base64-encode'
import { describe, expect, it } from '@jest/globals'

describe('base64StringDecodeSchema', () => {
  it('invalid', () => {
    expect(() => base64DecodeSchema.parse(undefined)).toThrow()
    expect(() => base64DecodeSchema.parse(null)).toThrow()
    expect(() => base64DecodeSchema.parse('')).toThrow()
    expect(() => base64DecodeSchema.parse('MY_PRIVATE_KEY_NOT_ENCODED')).toThrow()
  })
  it('valid', () => {
    const privateKey = 'MY_PRIVATE_KEY'
    const encodedPrivateKey = base64Encode(privateKey)
    expect(base64DecodeSchema.parse(encodedPrivateKey)).toEqual(privateKey)
  })
})

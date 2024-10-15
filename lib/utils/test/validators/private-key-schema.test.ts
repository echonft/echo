import { privateKeySchema } from '@echo/utils/validators/private-key-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - privateKeySchema', () => {
  it('invalid', () => {
    expect(() => privateKeySchema.parse(undefined)).toThrow()
    expect(() => privateKeySchema.parse(null)).toThrow()
    expect(() => privateKeySchema.parse('')).toThrow()
    expect(() => privateKeySchema.parse('MY_PRIVATE_KEY_NOT_ENCODED')).toThrow()
  })
  it('valid', () => {
    const privateKey = 'MY_PRIVATE_KEY'
    const encodedPrivateKey = Buffer.from(privateKey).toString('base64')
    expect(privateKeySchema.parse(encodedPrivateKey)).toEqual(privateKey)
  })
})

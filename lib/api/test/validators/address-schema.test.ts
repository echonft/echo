import { addressSchema } from '../../src/validators/address-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - address', () => {
  it('wrong address fails validation', () => {
    expect(() => addressSchema.parse(undefined)).toThrow()
    expect(() => addressSchema.parse('')).toThrow()
    expect(() => addressSchema.parse('asdasdsa')).toThrow()
    expect(() => addressSchema.parse('0xsss')).toThrow()
    expect(() => addressSchema.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8')).toThrow()
  })
  it('valid address pass', () => {
    expect(addressSchema.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')).toBe(
      '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'
    )
  })
})

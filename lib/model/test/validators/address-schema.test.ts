import { addressSchema } from '@echo/model/validators/address-schema'
import { bigIntStringSchema } from '@echo/model/validators/big-int-string-schema'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('addressSchema', () => {
  it('wrong address fails validation', () => {
    expect(() => addressSchema.parse(undefined)).toThrow()
    expect(() => bigIntStringSchema.parse(null)).toThrow()
    expect(() => addressSchema.parse('')).toThrow()
    expect(() => addressSchema.parse('asdasdsa')).toThrow()
    expect(() => addressSchema.parse('0xsss')).toThrow()
    expect(() => addressSchema.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8')).toThrow()
  })
  it('valid address pass', () => {
    expect(addressSchema.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')).toBe(
      toLower('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')
    )
  })
})

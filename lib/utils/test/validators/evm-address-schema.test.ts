import { bigIntStringSchema } from '@echo/utils/validators/big-int-string-schema'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('validators - evmAddressSchema', () => {
  it('wrong address fails validation', () => {
    expect(() => evmAddressSchema.parse(undefined)).toThrow()
    expect(() => bigIntStringSchema.parse(null)).toThrow()
    expect(() => evmAddressSchema.parse('')).toThrow()
    expect(() => evmAddressSchema.parse('asdasdsa')).toThrow()
    expect(() => evmAddressSchema.parse('0xsss')).toThrow()
    expect(() => evmAddressSchema.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8')).toThrow()
  })
  it('valid address pass', () => {
    expect(evmAddressSchema.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')).toBe(
      toLower('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')
    )
  })
})

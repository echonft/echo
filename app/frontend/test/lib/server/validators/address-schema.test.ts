import { addressSchema } from '@echo/frontend/lib/validators/address-schema'

describe('validators - addressSchema', () => {
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

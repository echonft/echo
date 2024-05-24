import { hexStringSchema } from '@echo/frontend/lib/validators/hex-string-schema'

describe('validators - hexStringSchema', () => {
  it('wrong string fails validation', () => {
    expect(() => hexStringSchema.parse(undefined)).toThrow()
    expect(() => hexStringSchema.parse('')).toThrow()
    expect(() => hexStringSchema.parse('asdasdsa')).toThrow()
    expect(() => hexStringSchema.parse('0xsss')).toThrow()
  })
  it('valid string pass', () => {
    expect(hexStringSchema.parse('0x000')).toBe('0x000')
    expect(hexStringSchema.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')).toBe(
      '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'
    )
  })
})

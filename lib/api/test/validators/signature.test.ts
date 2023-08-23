import { signatureSchema } from '../../src/validators/signature-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - signature', () => {
  it('wrong signature fails validation', () => {
    expect(() => signatureSchema.parse(undefined)).toThrow()
    expect(() => signatureSchema.parse('')).toThrow()
    expect(() => signatureSchema.parse('asdasdsa')).toThrow()
    expect(() => signatureSchema.parse('0xsss')).toThrow()
  })
  it('valid signature pass', () => {
    expect(signatureSchema.parse('0x000')).toBe('0x000')
    expect(signatureSchema.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')).toBe(
      '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'
    )
  })
})

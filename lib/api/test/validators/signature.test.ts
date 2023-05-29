import { signature } from '../../src/types/validators/signature'
import { describe, expect, it } from '@jest/globals'

describe('validators - signature', () => {
  it('wrong signature fails validation', () => {
    expect(() => signature.parse(undefined)).toThrow()
    expect(() => signature.parse('')).toThrow()
    expect(() => signature.parse('asdasdsa')).toThrow()
    expect(() => signature.parse('0xsss')).toThrow()
  })
  it('valid signature pass', () => {
    expect(signature.parse('0x000')).toBe('0x000')
    expect(signature.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')).toBe(
      '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'
    )
  })
})

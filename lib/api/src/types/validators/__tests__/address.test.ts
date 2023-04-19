import { address } from '../address'
import { describe, expect, it } from '@jest/globals'

describe('validators - address', () => {
  it('wrong address fails validation', () => {
    expect(() => address.parse('')).toThrow()
    expect(() => address.parse('asdasdsa')).toThrow()
    expect(() => address.parse('0xsss')).toThrow()
    expect(() => address.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8')).toThrow()
  })
  it('valid address pass', () => {
    expect(address.parse('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84')).toBe(
      '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'
    )
  })
})

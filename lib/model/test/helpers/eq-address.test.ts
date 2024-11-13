import { eqAddress } from '@echo/model/helpers/eq-address'
import { describe, expect, it } from '@jest/globals'

describe('eqAddress', () => {
  it('should return true when both addresses are null', () => {
    expect(eqAddress(null, null)).toBe(true)
  })

  it('should return true when both addresses are undefined', () => {
    expect(eqAddress(undefined, undefined)).toBe(true)
  })

  it('should return false when one address is null and the other is defined', () => {
    expect(eqAddress(null, '0x123')).toBe(false)
    expect(eqAddress('0x123', null)).toBe(false)
  })

  it('should return false when one address is undefined and the other is defined', () => {
    expect(eqAddress(undefined, '0x123')).toBe(false)
    expect(eqAddress('0x123', undefined)).toBe(false)
  })

  it('should return true for same addresses with different cases', () => {
    expect(eqAddress('0xABCD', '0xabcd')).toBe(true)
    expect(eqAddress('0xabcd', '0xABCD')).toBe(true)
  })

  it('should return false for different addresses', () => {
    expect(eqAddress('0x123', '0x456')).toBe(false)
  })

  it('should work in curried form', () => {
    const compareWith0x123 = eqAddress('0x123')
    expect(compareWith0x123('0x123')).toBe(true)
    expect(compareWith0x123('0x456')).toBe(false)
    expect(compareWith0x123(null)).toBe(false)
  })
})

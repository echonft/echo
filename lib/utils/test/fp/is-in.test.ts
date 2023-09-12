import { isIn } from '@echo-utils/fp/is-in'
import { describe, expect, it } from '@jest/globals'

describe('fp - isIn', () => {
  it('returns false if the value is not in the list', () => {
    expect(isIn(['a', 'b'])('c')).toBeFalsy()
  })
  it('returns true if the primitive element is in the list', () => {
    expect(isIn(['a', 'b', 'c'])('b')).toBeTruthy()
  })
  it('returns true if the object is in the list', () => {
    expect(
      isIn([
        { address: '0x0', chainId: 1 },
        { address: '0x1', chainId: 0 }
      ])({ address: '0x0', chainId: 1 })
    ).toBeTruthy()
  })
})

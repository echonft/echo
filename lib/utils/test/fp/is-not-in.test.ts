import { isNotIn } from '@echo/utils/fp/is-not-in'
import { describe, expect, it } from '@jest/globals'

describe('fp - isNotIn', () => {
  it('returns true if the value is not in the list', () => {
    expect(isNotIn(['a', 'b'])('c')).toBeTruthy()
  })
  it('returns false if the primitive element is in the list', () => {
    expect(isNotIn(['a', 'b', 'c'])('b')).toBeFalsy()
  })
  it('returns false if the object is in the list', () => {
    expect(
      isNotIn([
        { address: '0x0', chainId: 1 },
        { address: '0x1', chainId: 0 }
      ])({ address: '0x0', chainId: 1 })
    ).toBeFalsy()
  })
})

import { propIsNil } from '@echo-utils/fp/prop-is-nil'
import { describe, expect, it } from '@jest/globals'

describe('fp - propIsNil', () => {
  it('returns true if the prop does not exist', () => {
    const obj = {
      a: 1,
      b: 2
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(propIsNil('c', obj)).toBeTruthy()
  })
  it('returns true if the prop is undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(propIsNil('c', obj)).toBeTruthy()
  })
  it('returns false if the prop exists and is not undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }
    expect(propIsNil('c', obj)).toBeFalsy()
  })
})

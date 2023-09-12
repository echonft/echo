import { assocUndefinedIfPropNotPresent } from '@echo-utils/fp/assoc-undefined-if-prop-not-present'
import { describe, expect, it } from '@jest/globals'

describe('fp - assocUndefinedIfPropNotPresent', () => {
  it('prop it the result should the same value if present and defined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }
    expect(assocUndefinedIfPropNotPresent('c')(obj)).toStrictEqual(obj)
  })

  it('prop it the result should the same value if present and undefined', () => {
    const obj = {
      a: 1,
      b: undefined,
      c: 3
    }
    expect(assocUndefinedIfPropNotPresent('c')(obj)).toStrictEqual(obj)
  })

  it('prop it the result should be undefined it was not in the original object', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }
    expect(assocUndefinedIfPropNotPresent('d')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: 3,
      d: undefined
    })
  })
})

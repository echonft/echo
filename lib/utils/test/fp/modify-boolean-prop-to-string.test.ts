import { modifyBooleanPropToString } from '../../src/fp/modify-boolean-prop-to-string'
import { describe, expect, it } from '@jest/globals'

describe('fp - modifyBooleanPropToString', () => {
  it('returns the same object if prop is not present', () => {
    const obj = {
      a: 1,
      b: 2
    }
    expect(modifyBooleanPropToString('c')(obj)).toStrictEqual(obj)
  })

  it('removes the prop if it was present and undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyBooleanPropToString('c')(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })

  it('prop should be converted to "true" if its present and true', () => {
    const obj = {
      a: 1,
      b: 2,
      c: true
    }
    expect(modifyBooleanPropToString('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: 'true'
    })
  })

  it('prop should be converted to "false" if its present and false', () => {
    const obj = {
      a: 1,
      b: 2,
      c: false
    }
    expect(modifyBooleanPropToString('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: 'false'
    })
  })
})

import { modifyUrlPropToString } from '../../src/fp/modify-url-prop-to-string'
import { describe, expect, it } from '@jest/globals'

describe('fp - modifyUrlPropToString', () => {
  it('returns the same object if prop is not present', () => {
    const obj = {
      a: 1,
      b: 2
    }
    expect(modifyUrlPropToString('c')(obj)).toStrictEqual(obj)
  })

  it('removes the prop if it was present and undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyUrlPropToString('c')(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })

  it('prop should be converted to a string URL if it was present and a URL', () => {
    const urlString = 'https://echo.xyz/'
    const obj = {
      a: 1,
      b: 2,
      c: new URL(urlString)
    }
    expect(modifyUrlPropToString('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: urlString
    })
  })
})

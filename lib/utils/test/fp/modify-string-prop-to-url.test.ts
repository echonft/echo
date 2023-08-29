import { modifyStringPropToUrl } from '../../src'
import { describe, expect, it } from '@jest/globals'

describe('fp - modifyStringPropToUrl', () => {
  it('prop should get added as undefined if it was not present', () => {
    const obj = {
      a: 1,
      b: 2
    }
    expect(modifyStringPropToUrl('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: undefined
    })
  })

  it('prop should get stay as is if it was present and undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyStringPropToUrl('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: undefined
    })
  })

  it('shoud throw if the prop is defined but not a valid URL string', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 'not-a-valid-url'
    }
    expect(() => modifyStringPropToUrl('c')(obj)).toThrow()
  })

  it('prop should be converted to a URL if it was present and a valid URL string', () => {
    const url = 'https://echo.xyz/'
    const obj = {
      a: 1,
      b: 2,
      c: url
    }
    expect(modifyStringPropToUrl('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: new URL(url)
    })
  })
})

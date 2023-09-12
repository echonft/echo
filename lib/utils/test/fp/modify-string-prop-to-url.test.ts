import { modifyStringPropToUrl } from '@echo-utils/fp/modify-string-prop-to-url'
import { describe, expect, it } from '@jest/globals'

describe('fp - modifyStringPropToUrl', () => {
  it('object is returned as is if prop is not present', () => {
    const obj = {
      a: 1,
      b: 2
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(modifyStringPropToUrl<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })

  it('prop should get removed if it is present and undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyStringPropToUrl<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })

  it('should throw if the prop is defined but not a valid URL string', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 'not-a-valid-url'
    }
    expect(() => modifyStringPropToUrl<'c', typeof obj>('c')(obj)).toThrow()
  })

  it('prop should be converted to a URL if it was present and a valid URL string', () => {
    const url = 'https://echo.xyz/'
    const obj = {
      a: 1,
      b: 2,
      c: url
    }
    expect(modifyStringPropToUrl<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: new URL(url)
    })
  })
})

import { modifyStringPropToAddress } from '../../src/fp/modify-string-prop-to-address'
import { modifyStringPropToUrl } from '../../src/fp/modify-string-prop-to-url'
import { describe, expect, it } from '@jest/globals'

describe('fp - modifyStringPropToAddress', () => {
  it('object is returned as is if prop is not present', () => {
    const obj = {
      a: 1,
      b: 2
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(modifyStringPropToAddress<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })

  it('prop should get removed as is if it is present and undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyStringPropToAddress<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })

  it('should throw if the prop is defined but not a valid address', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 'not-a-valid-address'
    }
    expect(() => modifyStringPropToUrl<'c', typeof obj>('c')(obj)).toThrow()
  })

  it('prop should be formatted if it was present and a valid address', () => {
    const obj = {
      a: 1,
      b: 2,
      c: '0x12c63bbd266db84e117356e664f3604055166cec'
    }
    expect(modifyStringPropToAddress<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: '0x12c63bbD266dB84e117356e664f3604055166CEc'
    })
  })
})

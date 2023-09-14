import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('fp - modifyNumberPropToDate', () => {
  it('object is returned as is if prop is not present', () => {
    const obj = {
      a: 1,
      b: 2
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(modifyNumberPropToDate<'c', typeof obj>('c')(obj)).toStrictEqual({
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
    expect(modifyNumberPropToDate<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })

  it('should throw if the prop is defined but not a unix time', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 'not-a-valid-unix-time'
    }
    expect(() => modifyNumberPropToDate<'c', typeof obj>('c')(obj)).toThrow()
  })

  it('prop should be converted to a date if it was present and a number', () => {
    const unixTime = 1676984897
    const obj = {
      a: 1,
      b: 2,
      c: unixTime
    }
    expect(modifyNumberPropToDate<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: dayjs.unix(unixTime)
    })
  })
})

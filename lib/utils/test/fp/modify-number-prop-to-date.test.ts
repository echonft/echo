import { modifyNumberPropToDate } from '../../src'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('fp - modifyNumberPropToDate', () => {
  it('prop should get added as undefined if it was not present', () => {
    const obj = {
      a: 1,
      b: 2
    }
    expect(modifyNumberPropToDate('c')(obj)).toStrictEqual({
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
    expect(modifyNumberPropToDate('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: undefined
    })
  })

  it('shoud throw if the prop is defined but not a unix time', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 'not-a-valid-unix-time'
    }
    expect(() => modifyNumberPropToDate('c')(obj)).toThrow()
  })

  it('prop should be converted to a date if it was present and a number', () => {
    const unixTime = 1676984897
    const obj = {
      a: 1,
      b: 2,
      c: unixTime
    }
    expect(modifyNumberPropToDate('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: dayjs.unix(unixTime)
    })
  })
})

import { modifyDatePropToNumber } from '@echo-utils/fp/modify-date-prop-to-number'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('fp - modifyDatePropToNumber', () => {
  it('returns the same object if prop is not present', () => {
    const obj = {
      a: 1,
      b: 2
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(modifyDatePropToNumber<'c', typeof obj>('c')(obj)).toStrictEqual(obj)
  })

  it('removes the prop if it was present and undefined', () => {
    const obj = {
      a: 1,
      b: 2,
      c: undefined
    }
    expect(modifyDatePropToNumber<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2
    })
  })

  it('prop should be converted to a unix time if it was present and a date', () => {
    const unixTime = 1676984897
    const obj = {
      a: 1,
      b: 2,
      c: dayjs.unix(unixTime)
    }
    expect(modifyDatePropToNumber<'c', typeof obj>('c')(obj)).toStrictEqual({
      a: 1,
      b: 2,
      c: unixTime
    })
  })
})

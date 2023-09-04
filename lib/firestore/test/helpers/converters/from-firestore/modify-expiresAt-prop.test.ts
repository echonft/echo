import { modifyExpiresAtProp } from '../../../../src/helpers/converters/from-firestore/modify-expiresAt-prop'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('helpers - converters - from-firestore - modifyExpiresAtProp', () => {
  it('throws if expiresAt prop is not a valid unix time', () => {
    const obj = {
      a: 1,
      b: 2,
      expiresAt: 'not-a-valid-date'
    }
    expect(() => modifyExpiresAtProp(obj)).toThrow()
  })

  it('returns an object with expired prop to true if expiresAt prop is a valid unix time in the past', () => {
    const date = dayjs().subtract(1, 'day').unix()
    const obj = {
      a: 1,
      b: 2,
      expiresAt: date
    }
    expect(modifyExpiresAtProp(obj)).toStrictEqual({
      a: 1,
      b: 2,
      expiresAt: dayjs.unix(date),
      expired: true
    })
  })

  it('returns an object with expired prop to false if expiresAt prop is a valid unix time in the future', () => {
    const date = dayjs().add(1, 'day').unix()
    const obj = {
      a: 1,
      b: 2,
      expiresAt: date
    }
    expect(modifyExpiresAtProp(obj)).toStrictEqual({
      a: 1,
      b: 2,
      expiresAt: dayjs.unix(date),
      expired: false
    })
  })
})

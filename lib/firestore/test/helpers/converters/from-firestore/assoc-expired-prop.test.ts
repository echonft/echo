import { assocExpiredProp } from '@echo/firestore/helpers/converters/from-firestore/assoc-expired-prop'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('helpers - converters - from-firestore - modifyExpiresAtProp', () => {
  it('returns an object with expired prop to true if expiresAt prop is a valid unix time in the past', () => {
    const date = dayjs().subtract(1, 'day').unix()
    const obj = {
      a: 1,
      b: 2,
      expiresAt: date
    }
    expect(assocExpiredProp(obj)).toStrictEqual({
      ...obj,
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
    expect(assocExpiredProp(obj)).toStrictEqual({
      ...obj,
      expired: false
    })
  })
})

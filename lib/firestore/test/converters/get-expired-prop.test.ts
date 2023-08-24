import { getExpiredProp } from '../../src/helpers/converters/from-firestore/get-expired-prop'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('converters - dateIsBeforeNow', () => {
  it('returns true if expiresAt is in the past', () => {
    const expiresAt = dayjs().subtract(1, 'hour').unix()
    const documentData = { expiresAt }
    expect(getExpiredProp(documentData)).toBeTruthy()
  })

  it('returns false if expiresAt is in the future', () => {
    const expiresAt = dayjs().add(1, 'hour').unix()
    const documentData = { expiresAt }
    expect(getExpiredProp(documentData)).toBeFalsy()
  })
})

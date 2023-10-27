import { assertTransactionId } from '@echo/api/helpers/assert-transaction-id'
import { describe, expect, test } from '@jest/globals'

describe('helpers - assertTransactionId', () => {
  test('throws if transactionId is nil', () => {
    expect(() => assertTransactionId(undefined)).toThrow()
  })

  test('throws if transactionId is empty', () => {
    expect(() => assertTransactionId('')).toThrow()
  })

  test('does not throw if transaction exists', () => {
    expect(() => assertTransactionId('TEST')).not.toThrow()
  })
})

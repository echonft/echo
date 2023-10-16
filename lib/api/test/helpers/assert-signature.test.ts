import { assertSignature } from '@echo/api/helpers/assert-signature'
import { describe, expect, test } from '@jest/globals'

describe('helpers - assertSignature', () => {
  test('throws if signature is nil', () => {
    expect(() => assertSignature(undefined)).toThrow()
  })

  test('throws if signature is empty', () => {
    expect(() => assertSignature('')).toThrow()
  })

  test('does not throw if signature exists', () => {
    expect(() => assertSignature('TEST')).not.toThrow()
  })
})

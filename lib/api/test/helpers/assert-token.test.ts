import { assertToken } from '@echo/api/helpers/assert-token'
import { describe, expect, test } from '@jest/globals'

describe('helpers - assertToken', () => {
  test('throws if token is nil', () => {
    expect(() => assertToken({ token: undefined })).toThrow()
  })

  test('does not throw if token is valid', () => {
    expect(() => assertToken({ token: 'TEST' })).not.toThrow()
  })
})

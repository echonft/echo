import { offerSignatureApiUrl } from '@echo/api/routing/offer-signature-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - offerSignatureApiUrl', () => {
  test('throws if id is empty', () => {
    expect(() => offerSignatureApiUrl('')).toThrow()
  })

  test('returns proper URL', () => {
    expect(offerSignatureApiUrl('test')).toStrictEqual(new URL('https://echonft.xyz/api/offer/test/signature'))
  })
})

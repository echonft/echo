import { siweMessageSchema } from '../../src/validators/siwe-message-schema'
import { describe, expect, it } from '@jest/globals'
import { SiweMessage } from 'siwe'

describe('validators - wallet', () => {
  it('valid siwe message pass', () => {
    const message = new SiweMessage({
      domain: 'echo.xyz',
      address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
      statement: 'Sign in to add this wallet to your account',
      uri: 'https://echo.xyz',
      version: '1',
      chainId: 1,
      nonce: 'noncenoncenoncenoncenonce'
    })
    expect(siweMessageSchema.parse(message)).toEqual(message)
  })
})

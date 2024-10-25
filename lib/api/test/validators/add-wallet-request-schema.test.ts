import { addWalletRequestSchema } from '@echo/api/validators/add-wallet-request-schema'
import { Chain } from '@echo/model/constants/chain'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { describe, expect, it } from '@jest/globals'
import { head, pipe, prop } from 'ramda'
import { ZodIssueCode } from 'zod'

describe('validators - addWalletRequestSchema', () => {
  const address = walletMockCrew.address
  const chain = Chain.Blast
  const signature =
    '0x89eb5dc2993d982fe4d261b06d8433dcdacb9fe22aac1623fe9d444668bb7d3509ee29b54a01278b325c71438849f9d052f2ead93e3614d8e19449a9376e74351c'
  const message = Buffer.from(
    'aHR0cHM6Ly90ZXN0LmVjaG9uZnQueHl6IHdhbnRzIHlvdSB0byBzaWduIGluIHdpdGggeW91ciBFdGhlcmV1bSBhY2NvdW50OgoweDFFMzkxOGRENDRGNDI3RjA1NmJlNkM4RTEzMmNGMWI1RjQyZGU1OUUKClNpZ24gdGhpcyBtZXNzYWdlIHRvIGFkZCB5b3VyIHdhbGxldCB0byBFY2hvCgpVUkk6IGh0dHBzOi8vdGVzdC5lY2hvbmZ0Lnh5egpWZXJzaW9uOiAxCkNoYWluIElEOiAxNjg1ODc3NzMKTm9uY2U6IG5vbmNlbm9uY2Vub25jZQpJc3N1ZWQgQXQ6IDIwMjQtMDctMDhUMjA6MTI6MzguNzA0Wg==',
    'base64'
  ).toString('ascii')

  function expectZodError(data: unknown, code: ZodIssueCode, message?: string) {
    try {
      addWalletRequestSchema.parse(data)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      expect(() => {}).toThrow()
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), head, prop('code'))(err)).toBe(code)
      if (message) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(pipe(prop('issues'), head, prop('message'))(err)).toBe(message)
      }
    }
  }

  it('wrong wallet fails validation', () => {
    expectZodError({ address: undefined, chain, signature, message }, ZodIssueCode.invalid_type)
    expectZodError({ address: '', chain, signature, message }, ZodIssueCode.invalid_string)
    expectZodError(
      {
        address: '0xtest',
        chain,
        signature,
        message
      },
      ZodIssueCode.invalid_string
    )
    expectZodError(
      {
        address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8',
        chain,
        signature,
        message
      },
      ZodIssueCode.custom,
      'invalid address'
    )
    expectZodError({ address, chain: undefined, signature, message }, ZodIssueCode.invalid_type)
    expectZodError({ address, chain: '', signature, message }, ZodIssueCode.invalid_enum_value)
    expectZodError({ address, chain: 'not-supported', signature, message }, ZodIssueCode.invalid_enum_value)
  })
  it('wrong signature fails validation', () => {
    expectZodError({ address, chain, signature: undefined, message }, ZodIssueCode.invalid_type)
    expectZodError({ address, chain, signature: '', message }, ZodIssueCode.invalid_string)
    expectZodError({ address, chain, signature: '0xtest', message }, ZodIssueCode.invalid_string)
    expectZodError({ address, chain, signature: 'test', message }, ZodIssueCode.invalid_string)
  })
  it('wrong message fails validation', () => {
    expectZodError({ address, chain, signature, message: '' }, ZodIssueCode.too_small)
    expectZodError({ address, chain, signature, message: undefined }, ZodIssueCode.invalid_type)
  })

  it('valid request pass', () => {
    expect(addWalletRequestSchema.parse({ address, chain, signature, message })).toEqual({
      address,
      chain,
      signature,
      message
    })
  })
})

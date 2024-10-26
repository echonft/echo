import { addWalletRequestMock } from '@echo/api/mocks/add-wallet-request-mock'
import { addWalletRequestSchema } from '@echo/api/validators/add-wallet-request-schema'
import { describe, expect, it } from '@jest/globals'
import { head, pipe, prop } from 'ramda'
import { ZodIssueCode } from 'zod'

describe('validators - addWalletRequestSchema', () => {
  const { address, chain, message, signature } = addWalletRequestMock
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
    expect(addWalletRequestSchema.parse(addWalletRequestMock)).toEqual(addWalletRequestMock)
  })
})

import { removeWalletRequestMock } from '@echo/api/mocks/remove-wallet-request-mock'
import { removeWalletRequestSchema } from '@echo/api/validators/remove-wallet-request-schema'
import { describe, expect, it } from '@jest/globals'
import { head, pipe, prop } from 'ramda'
import { ZodIssueCode } from 'zod'

describe('validators - removeWalletRequestSchema', () => {
  const { address, chain } = removeWalletRequestMock

  function expectZodError(data: unknown, code: ZodIssueCode, message?: string) {
    try {
      removeWalletRequestSchema.parse(data)
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
    expectZodError({ address: undefined, chain }, ZodIssueCode.invalid_type)
    expectZodError({ address: '', chain }, ZodIssueCode.invalid_string)
    expectZodError(
      {
        address: '0xtest',
        chain
      },
      ZodIssueCode.invalid_string
    )
    expectZodError(
      {
        address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8',
        chain
      },
      ZodIssueCode.custom,
      'invalid address'
    )
    expectZodError({ address, chain: undefined }, ZodIssueCode.invalid_type)
    expectZodError({ address, chain: '' }, ZodIssueCode.invalid_enum_value)
    expectZodError({ address, chain: 'not-supported' }, ZodIssueCode.invalid_enum_value)
  })

  it('valid request pass', () => {
    expect(removeWalletRequestSchema.parse(removeWalletRequestMock)).toEqual(removeWalletRequestMock)
  })
})

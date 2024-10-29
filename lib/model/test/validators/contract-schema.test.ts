import { Chain } from '@echo/model/constants/chain'
import { contractSchema } from '@echo/model/validators/contract-schema'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

describe('contractSchema', () => {
  it('wrong address fails validation', () => {
    expect(() => contractSchema.parse({ address: undefined, chain: Chain.Ethereum })).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'undefined',
          path: ['address'],
          message: 'Required'
        }
      ])
    )
    expect(() => contractSchema.parse({ address: '', chain: Chain.Ethereum })).toThrow(
      ZodError.create([
        {
          validation: 'regex',
          code: ZodIssueCode.invalid_string,
          message: 'invalid hex string',
          path: ['address']
        },
        {
          code: ZodIssueCode.custom,
          message: 'invalid address',
          path: ['address']
        }
      ])
    )
    expect(() => contractSchema.parse({ address: '0xtest', chain: Chain.Ethereum })).toThrow(
      ZodError.create([
        {
          validation: 'regex',
          code: ZodIssueCode.invalid_string,
          message: 'invalid hex string',
          path: ['address']
        },
        {
          code: ZodIssueCode.custom,
          message: 'invalid address',
          path: ['address']
        }
      ])
    )
  })

  it('wrong chain fails validation', () => {
    expect(() => contractSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: '' })).toThrow()
    expect(() =>
      contractSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: 'not-supported' })
    ).toThrow()
    expect(() =>
      contractSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: undefined })
    ).toThrow()
  })

  it('valid contract pass', () => {
    expect(
      contractSchema.parse({ address: toLower('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'), chain: Chain.Ethereum })
    ).toStrictEqual({
      address: toLower('0xaf1C962f799954E2a43ffDEa5aCAa942d53e1F84'),
      chain: Chain.Ethereum
    })
  })
})

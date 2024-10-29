import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { walletSchema } from '@echo/model/validators/wallet-schema'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

describe('walletSchema', () => {
  it('wrong address fails validation', () => {
    expect(() => walletSchema.parse({ address: undefined, vm: VirtualMachine.Evm })).toThrow(
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
    expect(() => walletSchema.parse({ address: '', vm: VirtualMachine.Evm })).toThrow(
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
    expect(() => walletSchema.parse({ address: '0xtest', vm: VirtualMachine.Evm })).toThrow(
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

  it('wrong vm fails validation', () => {
    expect(() => walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', vm: '' })).toThrow()
    expect(() =>
      walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', vm: 'not-supported' })
    ).toThrow()
    expect(() => walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', vm: undefined })).toThrow()
  })

  it('valid wallet pass', () => {
    expect(
      walletSchema.parse({ address: toLower('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'), vm: VirtualMachine.Evm })
    ).toStrictEqual({
      address: toLower('0xaf1C962f799954E2a43ffDEa5aCAa942d53e1F84'),
      vm: VirtualMachine.Evm
    })
  })
})

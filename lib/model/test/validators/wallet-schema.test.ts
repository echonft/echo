import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { walletSchema } from '@echo/model/validators/wallet-schema'
import { describe, expect, it } from '@jest/globals'
import { map, pipe, prop, toLower } from 'ramda'
import { ZodError } from 'zod'

describe('walletSchema', () => {
  function expectZodError(data: unknown, path: (string | number)[]) {
    expect(() => walletSchema.parse(data)).toThrow()
    try {
      walletSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  it('wrong address fails validation', () => {
    const path = ['address']
    expectZodError({ address: undefined, vm: VirtualMachine.Evm }, path)
    expectZodError({ address: '', vm: VirtualMachine.Evm }, path)
    expectZodError({ address: '0xtest', vm: VirtualMachine.Evm }, path)
  })

  it('wrong vm fails validation', () => {
    const path = ['vm']
    expectZodError({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', vm: '' }, path)
    expectZodError({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', vm: 'not-supported' }, path)
    expectZodError({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', vm: undefined }, path)
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

import { Chain } from '@echo/model/constants/chain'
import { contractSchema } from '@echo/model/validators/contract-schema'
import { describe, expect, it } from '@jest/globals'
import { map, pipe, prop, toLower } from 'ramda'
import { ZodError } from 'zod'

describe('contractSchema', () => {
  function expectZodError(data: unknown, path: (string | number)[]) {
    expect(() => contractSchema.parse(data)).toThrow()
    try {
      contractSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  it('wrong address fails validation', () => {
    expectZodError({ address: undefined, chain: Chain.Ethereum }, ['address'])
    expectZodError({ address: '', chain: Chain.Ethereum }, ['address'])
    expectZodError({ address: '0xtest', chain: Chain.Ethereum }, ['address'])
  })

  it('wrong chain fails validation', () => {
    expectZodError({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: '' }, ['chain'])
    expectZodError({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: 'not-supported' }, ['chain'])
    expectZodError({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: undefined }, ['chain'])
  })

  it('valid contract pass', () => {
    const validData = { address: toLower('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'), chain: Chain.Ethereum }
    expect(contractSchema.parse(validData)).toStrictEqual(validData)
  })
})

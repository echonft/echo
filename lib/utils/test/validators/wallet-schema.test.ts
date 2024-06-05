import { getChains } from '@echo/utils/helpers/chains/get-chains'
import { walletSchema } from '@echo/utils/validators/wallet-schema'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('validators - walletSchema', () => {
  it('wrong address fails validation', () => {
    expect(() => walletSchema.parse({ address: undefined, chain: getChains()[0] })).toThrow()
    expect(() => walletSchema.parse({ address: '', chain: getChains()[0] })).toThrow()
    expect(() => walletSchema.parse({ address: '0xtest', chain: getChains()[0] })).toThrow()
  })
  it('wrong chain fails validation', () => {
    expect(() => walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: '' })).toThrow()
    expect(() =>
      walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: 'not-supported' })
    ).toThrow()
    expect(() =>
      walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chain: undefined })
    ).toThrow()
  })
  it('valid wallet pass', () => {
    expect(
      walletSchema.parse({ address: toLower('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'), chain: getChains()[0] })
    ).toStrictEqual({
      address: toLower('0xaf1C962f799954E2a43ffDEa5aCAa942d53e1F84'),
      chain: getChains()[0]
    })
  })
})

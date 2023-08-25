import { walletSchema } from '../../src/validators/wallet-schema'
import { describe, expect, it } from '@jest/globals'

describe('validators - walletSchema', () => {
  it('wrong address fails validation', () => {
    expect(() => walletSchema.parse({ address: undefined, chainId: 1 })).toThrow()
    expect(() => walletSchema.parse({ address: '', chainId: 1 })).toThrow()
    expect(() => walletSchema.parse({ address: '0xtest', chainId: 1 })).toThrow()
    expect(() => walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8', chainId: 1 })).toThrow()
  })
  it('wrong chain Id fails validation', () => {
    expect(() => walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: -100 })).toThrow()
    expect(() => walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 0 })).toThrow()
    expect(() =>
      walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: undefined })
    ).toThrow()
  })
  it('valid wallet pass', () => {
    expect(walletSchema.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 })).toStrictEqual({
      address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84',
      chainId: 1
    })
  })
})

import { walletSchema } from '@echo/frontend/lib/validators/wallet-schema'
import { CHAINS } from '@echo/utils/constants/chains/chains'
import { toLower } from 'ramda'

describe('validators - walletSchema', () => {
  it('wrong address fails validation', () => {
    expect(() => walletSchema.parse({ address: undefined, chain: CHAINS[0] })).toThrow()
    expect(() => walletSchema.parse({ address: '', chain: CHAINS[0] })).toThrow()
    expect(() => walletSchema.parse({ address: '0xtest', chain: CHAINS[0] })).toThrow()
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
      walletSchema.parse({ address: toLower('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'), chain: CHAINS[0] })
    ).toStrictEqual({
      address: toLower('0xaf1C962f799954E2a43ffDEa5aCAa942d53e1F84'),
      chain: CHAINS[0]
    })
  })
})

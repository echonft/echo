import { walletSchema } from '@echo/frontend/lib/validators/wallet-schema'
import { CHAIN_NAMES } from '@echo/utils/constants/chain-names'
import { toLower } from 'ramda'

describe('validators - walletSchema', () => {
  it('wrong address fails validation', () => {
    expect(() => walletSchema.parse({ address: undefined, chain: CHAIN_NAMES[0] })).toThrow()
    expect(() => walletSchema.parse({ address: '', chain: CHAIN_NAMES[0] })).toThrow()
    expect(() => walletSchema.parse({ address: '0xtest', chain: CHAIN_NAMES[0] })).toThrow()
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
      walletSchema.parse({ address: toLower('0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84'), chain: CHAIN_NAMES[0] })
    ).toStrictEqual({
      address: toLower('0xaf1C962f799954E2a43ffDEa5aCAa942d53e1F84'),
      chain: CHAIN_NAMES[0]
    })
  })
})

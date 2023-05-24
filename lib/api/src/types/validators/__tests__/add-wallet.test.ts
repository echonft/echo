import { addWalletSchema } from '../add-wallet'
import { users } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { SiweMessage } from 'siwe'

describe('validators - addWallet', () => {
  const wallet = users['oE6yUEQBPn7PZ89yMjKn']!.wallets![0]!
  const signature = '0x0000'
  const message: SiweMessage = new SiweMessage({
    domain: '',
    address: '0xtest',
    statement: 'test',
    uri: '',
    version: '1',
    chainId: 1,
    nonce: '',
    issuedAt: ''
  })
  it('wrong wallet fails validation', () => {
    expect(() => addWalletSchema.parse({ wallet: { address: undefined, chainId: 1 }, signature, message })).toThrow()
    expect(() => addWalletSchema.parse({ wallet: { address: '', chainId: 1 }, signature, message })).toThrow()
    expect(() => addWalletSchema.parse({ wallet: { address: '0xtest', chainId: 1 }, signature, message })).toThrow()
    expect(() =>
      addWalletSchema.parse({
        wallet: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8', chainId: 1 },
        signature,
        message
      })
    ).toThrow()
    expect(() =>
      addWalletSchema.parse({ wallet: { address: wallet.address, chainId: 0 }, signature, message })
    ).toThrow()
    expect(() =>
      addWalletSchema.parse({ wallet: { address: wallet.address, chainId: undefined }, signature, message })
    ).toThrow()
  })
  it('wrong signature fails validation', () => {
    expect(() => addWalletSchema.parse({ wallet, signature: undefined, message })).toThrow()
    expect(() => addWalletSchema.parse({ wallet, signature: '', message })).toThrow()
    expect(() => addWalletSchema.parse({ wallet, signature: '0xtest', message })).toThrow()
    expect(() => addWalletSchema.parse({ wallet, signature: 'test', message })).toThrow()
  })
  it('wrong message fails validation', () => {
    expect(() => addWalletSchema.parse({ wallet, signature, message: '' })).toThrow()
    expect(() => addWalletSchema.parse({ wallet, signature, message: undefined })).toThrow()
  })

  it('valid request pass', () => {
    expect(addWalletSchema.parse({ wallet, signature, message })).toStrictEqual({ wallet, signature, message })
  })
})

import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { addWalletSchema } from '@echo/frontend/lib/validators/add-wallet-schema'
import type { Wallet } from '@echo/model/types/wallet'
import { getChain } from '@echo/web3/helpers/get-chain'
import { assoc, pick, pipe } from 'ramda'
import { SiweMessage } from 'siwe'

describe('validators - addWalletSchema', () => {
  const chainId = getChain().id
  const wallet = pipe<[string], WalletDocumentData, Wallet, Wallet>(
    getWalletMockById,
    pick(['address', 'chainId']),
    assoc('chainId', chainId)
  )('i28NWtlxElPXCnO0c6BC')
  const signature = '0x0000'
  const message: string = new SiweMessage({
    domain: 'domain',
    address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
    statement: 'test',
    uri: 'https://bleh.com',
    version: '1',
    chainId,
    nonce: 'nonce1234567'
  }).prepareMessage()

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
    expect(addWalletSchema.parse({ wallet, signature, message })).toEqual({ wallet, signature, message })
  })
})

import { addWalletRequestSchema } from '@echo/api/validators/add-wallet-request-schema'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import { describe, expect, it } from '@jest/globals'

describe('validators - addWalletRequestSchema', () => {
  const wallet = getWalletMockByUsername(userMockJohnnyUsername())
  const signature =
    '0x89eb5dc2993d982fe4d261b06d8433dcdacb9fe22aac1623fe9d444668bb7d3509ee29b54a01278b325c71438849f9d052f2ead93e3614d8e19449a9376e74351c'
  const message = Buffer.from(
    'aHR0cHM6Ly90ZXN0LmVjaG9uZnQueHl6IHdhbnRzIHlvdSB0byBzaWduIGluIHdpdGggeW91ciBFdGhlcmV1bSBhY2NvdW50OgoweDFFMzkxOGRENDRGNDI3RjA1NmJlNkM4RTEzMmNGMWI1RjQyZGU1OUUKClNpZ24gdGhpcyBtZXNzYWdlIHRvIGFkZCB5b3VyIHdhbGxldCB0byBFY2hvCgpVUkk6IGh0dHBzOi8vdGVzdC5lY2hvbmZ0Lnh5egpWZXJzaW9uOiAxCkNoYWluIElEOiAxNjg1ODc3NzMKTm9uY2U6IG5vbmNlbm9uY2Vub25jZQpJc3N1ZWQgQXQ6IDIwMjQtMDctMDhUMjA6MTI6MzguNzA0Wg==',
    'base64'
  ).toString('ascii')
  const nonce = 'noncenoncenonce'

  it('wrong wallet fails validation', () => {
    expect(() =>
      addWalletRequestSchema.parse({ wallet: { address: undefined, chainId: 1 }, signature, message })
    ).toThrow()
    expect(() => addWalletRequestSchema.parse({ wallet: { address: '', chainId: 1 }, signature, message })).toThrow()
    expect(() =>
      addWalletRequestSchema.parse({ wallet: { address: '0xtest', chainId: 1 }, signature, message })
    ).toThrow()
    expect(() =>
      addWalletRequestSchema.parse({
        wallet: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8', chainId: 1 },
        signature,
        message
      })
    ).toThrow()
    expect(() =>
      addWalletRequestSchema.parse({ wallet: { address: wallet.address, chainId: 0 }, signature, message })
    ).toThrow()
    expect(() =>
      addWalletRequestSchema.parse({ wallet: { address: wallet.address, chainId: undefined }, signature, message })
    ).toThrow()
  })
  it('wrong signature fails validation', () => {
    expect(() => addWalletRequestSchema.parse({ wallet, signature: undefined, message })).toThrow()
    expect(() => addWalletRequestSchema.parse({ wallet, signature: '', message })).toThrow()
    expect(() => addWalletRequestSchema.parse({ wallet, signature: '0xtest', message })).toThrow()
    expect(() => addWalletRequestSchema.parse({ wallet, signature: 'test', message })).toThrow()
  })
  it('wrong message fails validation', () => {
    expect(() => addWalletRequestSchema.parse({ wallet, signature, message: '' })).toThrow()
    expect(() => addWalletRequestSchema.parse({ wallet, signature, message: undefined })).toThrow()
  })

  it('valid request pass', async () => {
    await expect(addWalletRequestSchema.parseAsync({ wallet, signature, message })).resolves.toEqual({
      wallet,
      nonce
    })
  })
})

import { Chain } from '@echo/model/constants/chain'
import { getNonceSiweMessageParams, type SignNonceArgs } from '@echo/web3-dom/services/sign-nonce'
import { describe, expect, test } from '@jest/globals'

describe('getNonceSiweMessageParams', () => {
  test('maps correctly', () => {
    const args: SignNonceArgs = {
      address: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e',
      chain: Chain.Ethereum,
      domain: 'echonft.xyz',
      uri: 'https://echonft.xyz/',
      nonce: 'noncenoncenoncenonce'
    }
    expect(getNonceSiweMessageParams(args)).toStrictEqual({
      domain: 'echonft.xyz',
      uri: 'https://echonft.xyz/',
      nonce: 'noncenoncenoncenonce',
      address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E',
      chainId: 1,
      statement: 'Sign this message to add your wallet to Echo',
      version: '1'
    })
  })
})

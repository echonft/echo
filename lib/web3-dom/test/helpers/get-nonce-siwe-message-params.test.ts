import type { Wallet } from '@echo/model/types/wallet'
import { Chain } from '@echo/model/constants/chain'
import { getNonceSiweMessageParams } from '@echo/web3-dom/helpers/get-nonce-siwe-message-params'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
import { describe, expect, test } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - getNonceSiweMessageParams', () => {
  const wallet: Wallet = {
    address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
    chain: Chain.Ethereum
  }
  test('maps correctly', () => {
    const args: SignNonceArgs = {
      domain: 'echonft.xyz',
      uri: 'https://echonft.xyz/',
      nonce: 'noncenoncenoncenonce',
      wallet: wallet
    }
    expect(getNonceSiweMessageParams(args)).toStrictEqual({
      domain: 'echonft.xyz',
      uri: 'https://echonft.xyz/',
      nonce: 'noncenoncenoncenonce',
      address: formatWalletAddress(wallet),
      chainId: 1,
      statement: 'Sign this message to add your wallet to Echo',
      version: '1'
    })
  })
})

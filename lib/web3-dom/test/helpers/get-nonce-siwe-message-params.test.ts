import type { Wallet } from '@echo/model/types/wallet'
import { CHAIN_ETHEREUM } from '@echo/utils/constants/chain-names'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getNonceSiweMessageParams } from '@echo/web3-dom/helpers/get-nonce-siwe-message-params'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import { describe, expect, test } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - getNonceSiweMessageParams', () => {
  const wallet: Wallet = {
    address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
    chain: CHAIN_ETHEREUM
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
      address: formatAddress(wallet),
      chainId: 1,
      statement: 'Sign this message to add your wallet to Echo',
      version: '1'
    })
  })
})

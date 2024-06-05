import { isEscrowing } from '@echo/contract-listener/helpers/is-escrowing'
import { walletMockJohnnyAddress } from '@echo/model-mocks/wallet/wallet-mock'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { describe, expect, it } from '@jest/globals'

describe('helpers - isEscrowing', () => {
  const chain: ChainName = 'blast'
  const echoAddress = getEchoAddressByChain(chain)
  const randomAddress = walletMockJohnnyAddress()

  it('returns true if TO is Echo', () => {
    expect(isEscrowing({ from: echoAddress, to: randomAddress, chain })).toBeTruthy()
  })
  it('returns true if FROM is Echo', () => {
    expect(isEscrowing({ from: randomAddress, to: echoAddress, chain })).toBeTruthy()
  })
  it('returns false if nothing is from Echo', () => {
    expect(isEscrowing({ from: randomAddress, to: randomAddress, chain })).toBeFalsy()
  })
})

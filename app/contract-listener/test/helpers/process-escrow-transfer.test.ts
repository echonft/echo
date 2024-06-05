import { processEscrowTransfer } from '@echo/contract-listener/helpers/process-escrow-transfer'
import { processInEscrowTransfer } from '@echo/contract-listener/helpers/process-in-escrow-transfer'
import { processOutEscrowTransfer } from '@echo/contract-listener/helpers/process-out-escrow-transfer'
import type { EscrowData } from '@echo/contract-listener/types/escrow-data'
import { walletMockJohnnyAddress } from '@echo/model-mocks/wallet/wallet-mock'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/contract-listener/helpers/process-in-escrow-transfer')
jest.mock('@echo/contract-listener/helpers/process-out-escrow-transfer')

describe('helpers - processEscrowTransfer', () => {
  const chain: ChainName = 'blast'
  const echoAddress = getEchoAddressByChain(chain)
  const randomAddress = walletMockJohnnyAddress()
  const contractAddress = '0xtest'

  it('process OUT escrow', async () => {
    const args = {
      from: echoAddress,
      chain,
      tokenId: 0,
      to: randomAddress,
      contractAddress: contractAddress
    } as EscrowData
    await processEscrowTransfer(args)
    expect(processOutEscrowTransfer).toBeCalledWith(args)
  })

  it('process IN escrow', async () => {
    const args = {
      from: randomAddress,
      chain,
      tokenId: 0,
      to: echoAddress,
      contractAddress: contractAddress
    } as EscrowData
    await processEscrowTransfer(args)
    expect(processInEscrowTransfer).toBeCalledWith(args)
  })
})

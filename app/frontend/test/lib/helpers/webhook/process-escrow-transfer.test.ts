import { processEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-escrow-transfer'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { walletMockJohnnyAddress } from '@echo/model/mocks/wallet/wallet-mock'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'

jest.mock('@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer')
jest.mock('@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer')

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
    } as NftTransfer
    await processEscrowTransfer(args)
    expect(processOutEscrowTransfer).toHaveBeenCalledWith(args)
  })

  it('process IN escrow', async () => {
    const args = {
      from: randomAddress,
      chain,
      tokenId: 0,
      to: echoAddress,
      contractAddress: contractAddress
    } as NftTransfer
    await processEscrowTransfer(args)
    expect(processInEscrowTransfer).toHaveBeenCalledWith(args)
  })
})

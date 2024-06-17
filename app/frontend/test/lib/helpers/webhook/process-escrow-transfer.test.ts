import { processEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-escrow-transfer'
import { processInEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer'
import { processOutEscrowTransfer } from '@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import type { Wallet } from '@echo/model/types/wallet'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { assoc, pipe } from 'ramda'

jest.mock('@echo/frontend/lib/helpers/webhook/process-in-escrow-transfer')
jest.mock('@echo/frontend/lib/helpers/webhook/process-out-escrow-transfer')

describe('helpers - processEscrowTransfer', () => {
  const chain: ChainName = 'blast'
  const echoWallet: Wallet = { address: getEchoAddress(chain), chain }
  const wallet: Wallet = pipe(userMockJohnnyUsername, getWalletMockByUsername, assoc('chain', chain))()
  const contract: Wallet = { address: '0xtest', chain }

  it('process OUT escrow', async () => {
    const transfer: NftTransfer = {
      from: echoWallet,
      tokenId: 0,
      to: wallet,
      contract
    }
    await processEscrowTransfer({ transfer })
    expect(processOutEscrowTransfer).toHaveBeenCalledWith({ transfer })
  })

  it('process IN escrow', async () => {
    const transfer: NftTransfer = {
      from: wallet,
      tokenId: 0,
      to: echoWallet,
      contract
    }
    await processEscrowTransfer({ transfer })
    expect(processInEscrowTransfer).toHaveBeenCalledWith({ transfer })
  })
})

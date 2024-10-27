import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { HexString } from '@echo/utils/types/hex-string'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { getEchoTradingFees } from '@echo/web3-dom/services/get-echo-trading-fees'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export interface AcceptOfferArgs {
  offerId: Lowercase<HexString>
  chain: Chain
}

export async function acceptOffer(args: AcceptOfferArgs) {
  const { offerId, chain } = args
  const address = echoAddress(chain)
  const tradingFees = await getEchoTradingFees({ chain })
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'acceptOffer',
    address,
    chainId: chainId(chain),
    args: [offerId],
    value: tradingFees
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}

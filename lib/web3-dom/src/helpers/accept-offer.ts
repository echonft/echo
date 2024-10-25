import { chainId } from '@echo/model/helpers/chain/chain-id'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { getEchoTradingFees } from '@echo/web3-dom/helpers/get-echo-trading-fees'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function acceptOffer(args: ContractUpdateOfferArgs) {
  const { offerId, chain } = args
  const address = getEchoAddress(chain)
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

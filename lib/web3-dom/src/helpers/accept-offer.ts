import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { getEchoTradingFees } from '@echo/web3-dom/helpers/get-echo-trading-fees'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function acceptOffer(args: ContractUpdateOfferArgs) {
  const { offerId, chain } = args
  const address = getEchoAddressByChain(chain)
  const chainId = getChainId(chain)
  const tradingFees = await getEchoTradingFees({ chain })
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'acceptOffer',
    address,
    chainId,
    args: [offerId],
    value: tradingFees
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}

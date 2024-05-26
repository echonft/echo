import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { echoAddressByChain } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { getEchoTradingFees } from '@echo/web3-dom/helpers/get-echo-trading-fees'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function executeOffer(args: ContractUpdateOfferArgs) {
  const { offerId, chain } = args
  const address = echoAddressByChain(chain)
  const chainId = getChainId(chain)
  const tradingFees = await getEchoTradingFees(chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'executeOffer',
    address,
    chainId,
    args: [offerId],
    value: tradingFees
  })
  return await writeContract(wagmiConfig, request)
}

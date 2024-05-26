import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { echoAddressByChain } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function redeemOffer(args: ContractUpdateOfferArgs) {
  const { offerId, chain } = args
  const address = echoAddressByChain(chain)
  const chainId = getChainId(chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'redeemOffer',
    address,
    chainId,
    args: [offerId]
  })
  return await writeContract(wagmiConfig, request)
}

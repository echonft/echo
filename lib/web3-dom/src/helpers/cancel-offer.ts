import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function cancelOffer(args: ContractUpdateOfferArgs) {
  const { offerId, chain } = args
  const address = getEchoAddress(chain)
  const chainId = getChainId(chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'cancelOffer',
    address,
    chainId,
    args: [offerId]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}

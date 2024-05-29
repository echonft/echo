import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function cancelOffer(args: ContractUpdateOfferArgs) {
  const { offerId, chain } = args
  const address = getEchoAddressByChain(chain)
  const chainId = getChainId(chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'cancelOffer',
    address,
    chainId,
    args: [offerId]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}

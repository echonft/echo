import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { mapOfferToContractCreateOffer } from '@echo/web3-dom/mappers/map-offer-to-contract-create-offer'
import type { CreateOfferArgs } from '@echo/web3-dom/types/create-offer-args'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function createOffer(args: CreateOfferArgs) {
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'createOffer',
    address: ECHO_ADDRESS,
    chainId: args.chainId,
    args: [mapOfferToContractCreateOffer(args) as never]
  })
  return await writeContract(wagmiConfig, request)
}

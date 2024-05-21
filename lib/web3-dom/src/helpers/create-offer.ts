import type { Contract } from '@echo/model/types/collection'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { mapOfferToContractCreateOffer } from '@echo/web3-dom/mappers/map-offer-to-contract-create-offer'
import type { ContractCreateOfferArgs } from '@echo/web3-dom/types/contract-create-offer-args'
import { head, path, pipe, prop } from 'ramda'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function createOffer(args: ContractCreateOfferArgs) {
  const { offer } = args
  // We take the chain from the first sender items as this is where the creation is executed
  // Also works for multichain
  const chainId = pipe<[Offer], OfferItem[], OfferItem, Contract[], Contract, ChainName, number>(
    prop('senderItems'),
    head,
    nonNullableReturn(path(['nft', 'collection', 'contracts'])),
    head,
    prop('chain'),
    getChainId
  )(offer)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'createOffer',
    address: ECHO_ADDRESS,
    chainId,
    args: [mapOfferToContractCreateOffer(offer) as never]
  })
  return await writeContract(wagmiConfig, request)
}

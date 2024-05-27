import type { BaseOffer } from '@echo/model/types/base-offer'
import type { Contract } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { echoAddressByChain } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { mapOfferToContractCreateOffer } from '@echo/web3-dom/mappers/map-offer-to-contract-create-offer'
import type { ContractCreateOfferArgs } from '@echo/web3-dom/types/contract-create-offer-args'
import { head, path, pipe, prop } from 'ramda'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function createOffer(args: ContractCreateOfferArgs): Promise<HexString> {
  const { offer } = args
  // We take the chain from the first sender items as this is where the creation is executed
  // Also works for multichain
  const chain = pipe<[BaseOffer], Nft[], Nft, Contract, ChainName>(
    prop('senderItems'),
    head,
    nonNullableReturn(path(['collection', 'contract'])),
    prop('chain')
  )(offer)

  const address = echoAddressByChain(chain)
  const chainId = getChainId(chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: ECHO_ABI,
    functionName: 'createOffer',
    address,
    chainId,
    args: [mapOfferToContractCreateOffer(offer) as never]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}

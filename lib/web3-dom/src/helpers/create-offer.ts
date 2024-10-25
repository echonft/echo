import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { Item } from '@echo/model/types/item'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ContractCreateOfferArgs } from '@echo/web3-dom/types/contract-create-offer-args'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { mapOfferToContractOffer } from '@echo/web3/mappers/map-offer-to-contract-offer'
import { head, type NonEmptyArray, path, pipe, prop } from 'ramda'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function createOffer(args: ContractCreateOfferArgs): Promise<HexString> {
  const { offer } = args
  // We take the chain from the first sender items as this is where the creation is executed
  // Also works for multichain
  const chain = pipe<[BaseOffer], NonEmptyArray<Item>, Item, Chain>(
    prop('senderItems'),
    head,
    path(['token', 'contract', 'chain'])
  )(offer)

  const address = getEchoAddress(chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'createOffer',
    address,
    chainId: chainId(chain),
    args: [mapOfferToContractOffer(offer) as never]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}

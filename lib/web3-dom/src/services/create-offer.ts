import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { Item } from '@echo/model/types/item'
import type { BaseOffer } from '@echo/model/types/offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { offerToEchoOffer } from '@echo/web3/mappers/offer-to-echo-offer'
import { head, type NonEmptyArray, path, pipe, prop } from 'ramda'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function createOffer(offer: BaseOffer): Promise<HexString> {
  // We take the chain from the first sender items as this is where the creation is executed
  // Also works for multichain
  const chain = pipe<[BaseOffer], NonEmptyArray<Item>, Item, Chain>(
    prop('senderItems'),
    head,
    path(['token', 'contract', 'chain'])
  )(offer)

  const address = echoAddress(chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'createOffer',
    address,
    chainId: chainId(chain) as number,
    args: [offerToEchoOffer(offer) as never]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}

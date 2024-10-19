import type { Chain } from '@echo/utils/constants/chain'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { mapReadContractOfferToContractOffer } from '@echo/web3/mappers/map-read-contract-offer-to-contract-offer'
import type { ContractOffer } from '@echo/web3/types/contract-offer'
import type { ReadContractOffer } from '@echo/web3/types/read-contract-offer'
import { always, andThen, otherwise, pipe } from 'ramda'
import { readContract } from 'viem/actions'

export interface GetEchoOfferArgs {
  chain: Chain
  offerId: HexString
}

export async function getEchoOffer(args: GetEchoOfferArgs): Promise<Nullable<ContractOffer>> {
  const { chain, offerId } = args
  const echoAddress = getEchoAddress(chain)
  const client = await getClientForChain(chain)
  const parameters = {
    abi: echoAbi,
    functionName: 'offers' as const,
    address: echoAddress,
    args: [offerId] as readonly [HexString]
  }
  return pipe<
    [typeof client, typeof parameters],
    Promise<Readonly<ReadContractOffer>>,
    Promise<Nullable<ContractOffer>>,
    Promise<Nullable<ContractOffer>>
  >(
    readContract,
    andThen(mapReadContractOfferToContractOffer),
    otherwise(always(undefined))
  )(client, parameters)
}

import type { Chain } from '@echo/model/constants/chain'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getClient } from '@echo/web3/helpers/get-client'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import type { EchoOffer } from '@echo/web3/types/echo-offer'
import { readEchoOfferSchema } from '@echo/web3/validators/read-echo-offer-schema'
import { always, andThen, otherwise, pipe } from 'ramda'
import { readContract } from 'viem/actions'

export interface GetEchoOfferArgs {
  chain: Chain
  offerId: HexString
}

export async function getEchoOffer(args: GetEchoOfferArgs): Promise<Nullable<EchoOffer>> {
  const { chain, offerId } = args
  const echoAddress = getEchoAddress(chain)
  const client = await getClient(chain)
  const parameters = {
    abi: echoAbi,
    functionName: 'offers' as const,
    address: echoAddress,
    args: [offerId] as readonly [HexString]
  }
  return pipe(
    readContract,
    andThen((data) => readEchoOfferSchema(chain).parse(data)),
    otherwise(always(undefined))
  )(client, parameters)
}

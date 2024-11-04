import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { getClient } from '@echo/web3/helpers/get-client'
import type { EchoOffer } from '@echo/web3/types/echo-offer'
import { readEchoOfferSchema } from '@echo/web3/validators/read-echo-offer-schema'
import { always, andThen, otherwise, pipe } from 'ramda'
import { readContract } from 'viem/actions'

export async function getEchoOffer(offerId: HexString): Promise<Nullable<EchoOffer>> {
  const client = getClient()
  const parameters = {
    abi: echoAbi,
    functionName: 'offers' as const,
    address: echoAddress,
    args: [offerId] as readonly [HexString]
  }
  return pipe(
    // FIXME abi does not match our model anymore
    // TODO update it
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    readContract,
    andThen((data) => readEchoOfferSchema.parse(data)),
    otherwise(always(undefined))
  )(client, parameters)
}

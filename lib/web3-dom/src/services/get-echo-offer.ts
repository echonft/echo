import type { HexString } from '@echo/model/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/constants/echo-address'
import type { EchoOffer } from '@echo/web3/types/echo-offer'
import { readEchoOfferSchema } from '@echo/web3/validators/read-echo-offer-schema'
import { always, andThen, otherwise, pipe } from 'ramda'
import { readContract } from 'wagmi/actions'

export async function getEchoOffer(offerId: HexString): Promise<Nullable<EchoOffer>> {
  return pipe(
    async () =>
      readContract(wagmiConfig, {
        abi: echoAbi,
        functionName: 'offers',
        address: echoAddress,
        args: [offerId]
      }),
    andThen((data) => readEchoOfferSchema.parse(data)),
    otherwise(always(undefined))
  )()
}

import { useAlchemy } from '../provider'
import { AlchemyOwnedNft, mapNft, mockedOwnedNft } from '@echo/alchemy'
import { SwrKey, SwrKeyNames } from '@echo/swr'
import { castAs, isProd, toPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, andThen, invoker, map, mergeDeepLeft, partialRight, pipe, prop } from 'ramda'
import useSWR, { SWRResponse, useSWRConfig } from 'swr'
import { SWRConfiguration } from 'swr/_internal'

interface KeyParam {
  address: string
}

// TODO move to an API call
// TODO mock `alchemy` instead of the hooks themselves
const useProdUserNfts = (address: string, options?: SWRConfiguration) => {
  const {
    alchemy: { nft }
  } = useAlchemy()
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<AlchemyOwnedNft[], Error>, Error, SwrKey<KeyParam>>(
    { name: SwrKeyNames.ALCHEMY_GET_NFTS, data: { address } },
    pipe(
      prop('data'),
      prop('address'),
      partialRight(invoker(1, 'getNftsForOwner'), [nft]),
      andThen(pipe(prop('ownedNfts'), map(mapNft))),
      R.fromPromise<AlchemyOwnedNft[]>
    ),
    pipe(mergeDeepLeft({ suspense }), castAs<SWRConfiguration>)(options ?? {})
  )
}

const useDevUserNfts = (options?: SWRConfiguration) => {
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<AlchemyOwnedNft[], Error>, Error, SwrKey<KeyParam>>(
    { name: SwrKeyNames.ALCHEMY_GET_NFTS },
    always(R.fromPromise(toPromise([mockedOwnedNft]))),
    pipe(mergeDeepLeft({ suspense }), castAs<SWRConfiguration>)(options ?? {})
  )
}

export const useUserNfts = (
  address: string,
  options?: SWRConfiguration
): SWRResponse<R.Result<AlchemyOwnedNft[], Error>, Error> =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  isProd ? useProdUserNfts(address, options) : useDevUserNfts(options)

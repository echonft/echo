import { useAlchemy } from '../provider'
import { AlchemyOwnedNft, mapNft, mockedOwnedNft } from '@echo/alchemy'
import { getCompoundKey, SwrKeys } from '@echo/swr'
import { isProd } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, map, pipe, prop } from 'ramda'
import useSWR, { SWRResponse, useSWRConfig } from 'swr'
import { SWRConfiguration } from 'swr/_internal'

// TODO move to an API call
// TODO mock `alchemy` instead of the hooks themselves
const useProdUserNfts = (address: string, options?: SWRConfiguration) => {
  const { alchemy } = useAlchemy()
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<AlchemyOwnedNft[], Error>, Error, string>(
    getCompoundKey(SwrKeys.GET_NFTS, address),
    pipe(() => alchemy.nft.getNftsForOwner(address), andThen(pipe(prop('ownedNfts'), map(mapNft))), R.fromPromise),
    Object.assign({ suspense }, options ?? {})
  )
}

const useDevUserNfts = (options?: SWRConfiguration) => {
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<AlchemyOwnedNft[], Error>, Error, string>(
    SwrKeys.GET_NFTS,
    () => R.fromPromise(Promise.resolve([mockedOwnedNft])),
    Object.assign({ suspense }, options ?? {})
  )
}

export const useUserNfts = (
  address: string,
  options?: SWRConfiguration
): SWRResponse<R.Result<AlchemyOwnedNft[], Error>, Error> =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  isProd ? useProdUserNfts(address, options) : useDevUserNfts(options)

import { useAlchemy } from '../provider'
import { mapNft } from '@echo/alchemy'
import { mockedNft, Nft } from '@echo/model'
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
  return useSWR<R.Result<Nft[], Error>, Error, string>(
    getCompoundKey(SwrKeys.GET_NFTS, address),
    () => pipe(andThen(pipe(prop('ownedNfts'), map(mapNft))), R.fromPromise)(alchemy.nft.getNftsForOwner(address)),
    Object.assign({ suspense }, options ?? {})
  )
}

const useDevUserNfts = (options?: SWRConfiguration) => {
  const { suspense } = useSWRConfig()
  return useSWR<R.Result<Nft[], Error>, Error, string>(
    SwrKeys.GET_NFTS,
    () => R.fromPromise(Promise.resolve([mockedNft])),
    Object.assign({ suspense }, options ?? {})
  )
}

export const useUserNfts = (address: string, options?: SWRConfiguration): SWRResponse<R.Result<Nft[], Error>, Error> =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  isProd ? useProdUserNfts(address, options) : useDevUserNfts(options)

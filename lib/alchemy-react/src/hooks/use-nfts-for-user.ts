import { useAlchemy } from '../provider'
import { AlchemyOwnedNft } from '@echo/alchemy'
import { mapOwnedNft } from '@echo/alchemy/dist/mappers/map-owned-nft'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { OwnedNft } from 'alchemy-sdk'
import { NftNamespace } from 'alchemy-sdk/dist/src/api/nft-namespace'
import { GetNftsForOwnerOptions, OwnedNftsResponse } from 'alchemy-sdk/dist/src/types/types'
import { always, andThen, call, converge, invoker, map, pipe, prop } from 'ramda'
import useSWR from 'swr'

interface KeyData {
  address: string | undefined
  options: GetNftsForOwnerOptions | undefined
}

export const useNftsForUser = (address: string | undefined, options?: GetNftsForOwnerOptions) => {
  const {
    alchemy: { nft }
  } = useAlchemy()

  return useSWR<R.Result<AlchemyOwnedNft[], Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      { name: SwrKeyNames.ALCHEMY_GET_NFTS_FOR_USER, data: { address, options } },
      always(isNilOrEmpty(address))
    ),
    pipe(
      prop('data'),
      converge<
        Promise<OwnedNftsResponse>,
        [
          (key: KeyData) => (...args: unknown[]) => Promise<OwnedNftsResponse>,
          (key: KeyData) => string,
          (key: KeyData) => GetNftsForOwnerOptions,
          (key: KeyData) => NftNamespace
        ]
      >(call, [
        always(invoker(2, 'getNftsForOwner')),
        prop<string>('address'),
        prop<GetNftsForOwnerOptions>('options'),
        always(nft)
      ]),
      andThen(pipe(prop<OwnedNft[]>('nfts'), map(mapOwnedNft))),
      R.fromPromise<AlchemyOwnedNft[]>
    )
  )
}

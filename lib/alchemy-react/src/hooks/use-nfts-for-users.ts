import { useAlchemy } from '../provider'
import { AlchemyOwnedNft } from '@echo/alchemy'
import { mapOwnedNft } from '@echo/alchemy/dist/mappers/map-owned-nft'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty, promiseAll } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { OwnedNft } from 'alchemy-sdk'
import { NftNamespace } from 'alchemy-sdk/dist/src/api/nft-namespace'
import { GetNftsForOwnerOptions, OwnedNftsResponse } from 'alchemy-sdk/dist/src/types/types'
import { always, andThen, applySpec, call, converge, identity, invoker, isNil, map, pipe, prop } from 'ramda'
import useSWR from 'swr'

interface RequestData {
  address: string
  options: GetNftsForOwnerOptions | undefined
}

interface KeyData {
  requests: RequestData[]
}

export const useNftsForUsers = (addresses: string[] | undefined, options?: GetNftsForOwnerOptions) => {
  const {
    alchemy: { nft }
  } = useAlchemy()
  return useSWR<R.Result<AlchemyOwnedNft[][], Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.ALCHEMY_GET_NFTS_FOR_USERS,
        data: {
          requests: isNil(addresses)
            ? []
            : map<string, RequestData>(applySpec({ address: identity, options: always(options) }))(addresses)
        }
      },
      always(isNilOrEmpty(addresses))
    ),
    pipe(
      prop<KeyData>('data'),
      prop<RequestData[]>('requests'),
      map<RequestData, Promise<OwnedNftsResponse>>(
        converge<
          Promise<OwnedNftsResponse>,
          [
            (request: RequestData) => (...args: unknown[]) => Promise<OwnedNftsResponse>,
            (request: RequestData) => string,
            (request: RequestData) => GetNftsForOwnerOptions,
            (request: RequestData) => NftNamespace
          ]
        >(call, [
          always(invoker(2, 'getNftsForOwner')),
          prop<string>('address'),
          prop<GetNftsForOwnerOptions>('options'),
          always(nft)
        ])
      ),
      promiseAll,
      andThen(map(pipe(prop<OwnedNft[]>('ownedNfts'), map(mapOwnedNft)))),
      R.fromPromise<AlchemyOwnedNft[][]>
    )
  )
}

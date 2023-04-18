import { useAlchemy } from '../provider/alchemy-provider'
import { AlchemyNft, mapNft } from '@echo/alchemy'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty, promiseAll } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { GetNftsForContractOptions, Nft } from 'alchemy-sdk'
import { NftNamespace } from 'alchemy-sdk/dist/src/api/nft-namespace'
import { GetNftsForOwnerOptions, NftContractNftsResponse } from 'alchemy-sdk/dist/src/types/types'
import { always, andThen, applySpec, call, converge, identity, invoker, isNil, map, pipe, prop } from 'ramda'
import useSWR from 'swr'

interface RequestData {
  address: string
  options: GetNftsForContractOptions | undefined
}

interface KeyData {
  requests: RequestData[]
}

export const useNftsForContracts = (addresses: string[] | undefined, options?: GetNftsForContractOptions) => {
  const {
    alchemy: { nft }
  } = useAlchemy()

  return useSWR<R.Result<AlchemyNft[][], Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      {
        name: SwrKeyNames.ALCHEMY_GET_NFTS_FOR_CONTRACTS,
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
      map<RequestData, Promise<NftContractNftsResponse>>(
        converge<
          Promise<NftContractNftsResponse>,
          [
            (request: RequestData) => (...args: unknown[]) => Promise<NftContractNftsResponse>,
            (request: RequestData) => string,
            (request: RequestData) => GetNftsForContractOptions,
            (request: RequestData) => NftNamespace
          ]
        >(call, [
          always(invoker(2, 'getNftsForContract')),
          prop<string>('address'),
          prop<GetNftsForOwnerOptions>('options'),
          always(nft)
        ])
      ),
      promiseAll,
      andThen(map(pipe(prop<Nft[]>('nfts'), map(mapNft)))),
      R.fromPromise<AlchemyNft[][]>
    )
  )
}

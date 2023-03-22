import { useAlchemy } from '../provider'
import { AlchemyNft, mapNft } from '@echo/alchemy'
import { getConditionalFetchKey, SwrKey, SwrKeyNames } from '@echo/swr'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { GetNftsForContractOptions, Nft } from 'alchemy-sdk'
import { NftNamespace } from 'alchemy-sdk/dist/src/api/nft-namespace'
import { NftContractNftsResponse } from 'alchemy-sdk/dist/src/types/types'
import { always, andThen, call, converge, invoker, map, pipe, prop } from 'ramda'
import useSWR from 'swr'

interface KeyData {
  address: string | undefined
  options: GetNftsForContractOptions | undefined
}
export function useNftsForContract(address: string | undefined, options?: GetNftsForContractOptions) {
  const {
    alchemy: { nft }
  } = useAlchemy()

  return useSWR<R.Result<AlchemyNft[], Error>, Error, SwrKey<KeyData> | undefined>(
    getConditionalFetchKey<KeyData>(
      { name: SwrKeyNames.ALCHEMY_GET_NFTS_FOR_CONTRACT, data: { address, options } },
      always(isNilOrEmpty(address))
    ),
    pipe(
      prop('data'),
      converge<
        Promise<NftContractNftsResponse>,
        [
          (key: KeyData) => (...args: unknown[]) => Promise<NftContractNftsResponse>,
          (key: KeyData) => string,
          (key: KeyData) => GetNftsForContractOptions,
          (key: KeyData) => NftNamespace
        ]
      >(call, [
        always(invoker(2, 'getNftsForContract')),
        prop<string>('address'),
        prop<GetNftsForContractOptions>('options'),
        always(nft)
      ]),
      andThen(pipe(prop<Nft[]>('nfts'), map(mapNft))),
      R.fromPromise<AlchemyNft[]>
    )
  )
}

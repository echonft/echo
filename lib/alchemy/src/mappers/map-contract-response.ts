import { type ContractResponse } from '@echo/alchemy/types/response/contract-response'
import { getBlurUrlForCollection } from '@echo/model/helpers/collection/get-blur-url-for-collection'
import { getOpenSeaUrlForCollection } from '@echo/model/helpers/collection/get-open-sea-url-for-collection'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import {
  always,
  applySpec,
  assoc,
  isNil,
  modify,
  partial,
  partialRight,
  path,
  pick,
  pipe,
  prop,
  toLower,
  unless
} from 'ramda'

function mapContract(chainId: number) {
  return function (contractResponse: ContractResponse): Contract {
    return pipe<
      [ContractResponse],
      Pick<ContractResponse, 'address' | 'tokenType' | 'name' | 'symbol'>,
      Omit<Contract, 'chainId'>,
      Contract
    >(
      pick(['address', 'tokenType', 'name', 'symbol']),
      modify<'address', HexString, Lowercase<HexString>>('address', toLower<HexString>),
      assoc('chainId', chainId)
    )(contractResponse)
  }
}
export function mapContractResponse(chainId: number, verified?: boolean) {
  return function (contractResponse: ContractResponse): Omit<Collection, 'id'> {
    return applySpec<Omit<Collection, 'id'>>({
      bannerUrl: pipe(nonNullableReturn(path(['openSeaMetadata', 'bannerImageUrl'])), removeQueryFromUrl),
      blurUrl: pipe<[ContractResponse], string, Nullable<string>>(
        nonNullableReturn(path(['openSeaMetadata', 'collectionSlug'])),
        partial(getBlurUrlForCollection, [chainId])
      ),
      contract: mapContract(chainId),
      description: path(['openSeaMetadata', 'description']),
      discordUrl: path(['openSeaMetadata', 'discordUrl']),
      floorPrice: path(['openSeaMetadata', 'floorPrice']),
      name: prop('name'),
      openSeaUrl: pipe<[ContractResponse], string, Nullable<string>>(
        nonNullableReturn(path(['openSeaMetadata', 'collectionSlug'])),
        partial(getOpenSeaUrlForCollection, [chainId])
      ),
      slug: pipe(nonNullableReturn(path(['openSeaMetadata', 'collectionSlug'])), toLower),
      profilePictureUrl: pipe(nonNullableReturn(path(['openSeaMetadata', 'imageUrl'])), removeQueryFromUrl),
      totalSupply: pipe(prop('totalSupply'), unless(isNil, partialRight(parseInt, [10]))),
      twitterUsername: path(['openSeaMetadata', 'twitterUsername']),
      verified: always(Boolean(verified)),
      websiteUrl: path(['openSeaMetadata', 'externalUrl'])
    })(contractResponse)
  }
}

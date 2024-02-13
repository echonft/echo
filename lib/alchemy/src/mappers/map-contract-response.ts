import { type ContractResponse } from '@echo/alchemy/types/response/contract-response'
import { getBlurUrlForCollection } from '@echo/model/helpers/collection/get-blur-url-for-collection'
import { getOpenSeaUrlForCollection } from '@echo/model/helpers/collection/get-open-sea-url-for-collection'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
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
      Pick<ContractResponse, 'address' | 'tokenType' | 'name' | 'symbol'>,
      Contract
    >(
      pick(['address', 'tokenType', 'name', 'symbol']),
      modify('address', toLower),
      assoc('chainId', chainId)
    )(contractResponse)
  }
}
export function mapContractResponse(chainId: number, verified?: boolean) {
  return function (contractResponse: ContractResponse): Omit<Collection, 'id'> {
    return applySpec<Omit<Collection, 'id'>>({
      bannerUrl: nonNullableReturn(path(['openSeaMetadata', 'bannerImageUrl'])),
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
      profilePictureUrl: nonNullableReturn(path(['openSeaMetadata', 'imageUrl'])),
      totalSupply: pipe(prop('totalSupply'), unless(isNil, partialRight(parseInt, [10]))),
      twitterUsername: path(['openSeaMetadata', 'twitterUsername']),
      verified: always(Boolean(verified)),
      websiteUrl: path(['openSeaMetadata', 'externalUrl'])
    })(contractResponse)
  }
}

import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import type { CollectionResponse } from '@echo/nft-scan/types/response/collection-response'
import { getCollectionResponseSchema } from '@echo/nft-scan/validators/get-collection-response-schema'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { removeSpecialCharacters } from '@echo/utils/fp/remove-special-characters'
import type { ChainName } from '@echo/utils/types/chain-name'
import { always, applySpec, F, ifElse, pipe, prop, replace, toLower } from 'ramda'

export interface MapCollectionResponseArgs {
  chain: ChainName
  data: ReturnType<typeof getCollectionResponseSchema.parse>['data']
}

export function removeNullOrEmptyString(value: string | null): string | undefined {
  if (isNilOrEmpty(value)) {
    return undefined
  }
  return value
}

export function mapCollectionResponse(args: MapCollectionResponseArgs): Collection {
  const { chain, data } = args
  return applySpec<Collection>({
    bannerUrl: pipe(prop('banner_url'), removeNullOrEmptyString),
    contract: applySpec<Wallet>({ address: prop('contract_address'), chain: always(chain) }),
    description: pipe(prop('description'), removeNullOrEmptyString),
    discordUrl: pipe(prop('discord'), removeNullOrEmptyString),
    name: prop('name'),
    profilePictureUrl: pipe(prop('logo_url'), removeNullOrEmptyString),
    slug: ifElse<[CollectionResponse], string, string>(
      propIsNil('opensea_slug'),
      pipe<[CollectionResponse], string, string, string, string>(
        prop('name'),
        toLower,
        replace(/\s+/g, '-'),
        removeSpecialCharacters
      ),
      nonNullableReturn(prop('opensea_slug'))
    ),
    twitterUsername: pipe(prop('twitter'), removeNullOrEmptyString),
    totalSupply: prop('items_total'),
    websiteUrl: pipe(prop('website'), removeNullOrEmptyString),
    verified: F
  })(data)
}

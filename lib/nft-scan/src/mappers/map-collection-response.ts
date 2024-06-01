import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import type { GetCollectionResponse } from '@echo/nft-scan/types/response/get-collection-response'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { removeNull } from '@echo/utils/fp/remove-null'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { ChainName } from '@echo/utils/types/chain-name'
import { always, applySpec, ifElse, isNil, pipe, prop, replace, toLower } from 'ramda'

export function mapCollectionResponse(
  response: GetCollectionResponse,
  chain: ChainName
): Omit<Collection, 'swapsCount'> {
  return applySpec<Omit<Collection, 'swapsCount'>>({
    bannerUrl: pipe(prop('banner_url'), ifElse(isNil, removeNull, removeQueryFromUrl)),
    contract: applySpec<Wallet>({ address: pipe(prop('contract_address'), toLower), chain: always(chain) }),
    description: pipe(prop('description'), removeNull),
    discordUrl: pipe(prop('discord'), removeNull),
    name: prop('name'),
    profilePictureUrl: pipe(prop('logo_url'), ifElse(isNil, removeNull, removeQueryFromUrl)),
    slug: ifElse<[GetCollectionResponse], string, string>(
      propIsNil('opensea_slug'),
      pipe<[GetCollectionResponse], string, string, string>(prop('name'), replace(/\s+/g, '-'), toLower),
      nonNullableReturn(prop('opensea_slug'))
    ),
    twitterUsername: pipe(prop('twitter'), removeNull),
    totalSupply: prop('items_total'),
    websiteUrl: pipe(prop('website'), removeNull),
    verified: prop('verified')
  })(response)
}

import type { Collection } from '@echo/model/types/collection'
import { mapContractResponse } from '@echo/opensea/mappers/map-contract-response'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { applySpec, map, pipe, prop, toLower } from 'ramda'

export function mapCollectionResponse(response: CollectionResponse): Omit<Collection, 'swapsCount' | 'verified'> {
  return applySpec<Omit<Collection, 'swapsCount' | 'verified'>>({
    bannerUrl: pipe(prop('banner_image_url'), pipe(toLower, removeQueryFromUrl)),
    contracts: pipe(prop('contracts'), map(mapContractResponse)),
    description: prop('description'),
    discordUrl: pipe(prop('discord_url'), unlessNil(toLower)),
    name: prop('name'),
    profilePictureUrl: pipe(prop('image_url'), pipe(toLower, removeQueryFromUrl)),
    slug: prop('slug'),
    totalSupply: prop('total_supply')
  })(response)
}

import type { Collection } from '@echo/model/types/collection'
import { mapContractResponse } from '@echo/opensea/mappers/map-contract-response'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { NON_TESTNET_CHAIN_NAME } from '@echo/utils/constants/chain-names'
import { isIn } from '@echo/utils/fp/is-in'
import { throwError } from '@echo/utils/fp/throw-error'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { applySpec, find, ifElse, isNil, pipe, prop, propSatisfies } from 'ramda'

export function mapCollectionResponse(response: CollectionResponse): Omit<Collection, 'swapsCount' | 'verified'> {
  return applySpec<Omit<Collection, 'swapsCount' | 'verified'>>({
    bannerUrl: pipe(prop('banner_image_url'), removeQueryFromUrl),
    contract: pipe(
      prop('contracts'),
      find(propSatisfies(isIn(NON_TESTNET_CHAIN_NAME), 'chain')),
      ifElse(isNil, throwError('no contract found on supported chains'), mapContractResponse)
    ),
    description: prop('description'),
    discordUrl: prop('discord_url'),
    name: prop('name'),
    profilePictureUrl: pipe(prop('image_url'), removeQueryFromUrl),
    slug: prop('collection'),
    totalSupply: prop('total_supply')
  })(response)
}

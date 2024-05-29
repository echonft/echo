import type { Collection } from '@echo/model/types/collection'
import { mapCollectionContractResponse } from '@echo/opensea/mappers/map-collection-contract-response'
import type { CollectionContractResponse } from '@echo/opensea/types/response/collection-contract-response'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { SUPPORTED_CHAINS } from '@echo/utils/constants/chains/supported-chains'
import { isIn } from '@echo/utils/fp/is-in'
import { throwError } from '@echo/utils/fp/throw-error'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { always, applySpec, find, ifElse, isNil, pipe, prop, propSatisfies, unless } from 'ramda'

export function mapCollectionResponse(
  response: CollectionResponse,
  skipContractCheck?: boolean
): Omit<Collection, 'swapsCount' | 'verified'> {
  return applySpec<Omit<Collection, 'swapsCount' | 'verified'>>({
    bannerUrl: pipe(prop('banner_image_url'), removeQueryFromUrl),
    contract: pipe(
      prop('contracts'),
      unless(
        always(skipContractCheck) as (args: CollectionContractResponse[]) => boolean,
        pipe(
          find(propSatisfies(isIn(SUPPORTED_CHAINS), 'chain')),
          ifElse(isNil, throwError('no contract found on supported chains'), mapCollectionContractResponse)
        )
      )
    ),
    description: prop('description'),
    discordUrl: prop('discord_url'),
    name: prop('name'),
    profilePictureUrl: pipe(prop('image_url'), removeQueryFromUrl),
    slug: prop('collection'),
    totalSupply: prop('total_supply')
  })(response)
}

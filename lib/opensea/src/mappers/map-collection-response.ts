import type { Collection } from '@echo/model/types/collection'
import { mapContractResponse } from '@echo/opensea/mappers/map-contract-response'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import type { ContractResponse } from '@echo/opensea/types/response/contract-response'
import { isIn } from '@echo/utils/fp/is-in'
import { throwError } from '@echo/utils/fp/throw-error'
import { getSupportedChains } from '@echo/utils/helpers/get-supported-chains'
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
        always(skipContractCheck) as (args: ContractResponse[]) => boolean,
        pipe(
          find(propSatisfies(isIn(getSupportedChains()), 'chain')),
          ifElse(isNil, throwError('no contract found on supported chains'), mapContractResponse)
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

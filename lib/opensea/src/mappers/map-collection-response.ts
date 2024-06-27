import type { Collection } from '@echo/model/types/collection'
import { mapCollectionContractResponse } from '@echo/opensea/mappers/map-collection-contract-response'
import type { CollectionContractResponse } from '@echo/opensea/types/response/collection-contract-response'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { isIn } from '@echo/utils/fp/is-in'
import { removeSpecialCharacters } from '@echo/utils/fp/remove-special-characters'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, applySpec, assoc, find, isNil, pipe, prop, propSatisfies, toLower } from 'ramda'

interface MapCollectionResponseArgs {
  response: CollectionResponse
  skipContractCheck?: boolean
}

export function mapCollectionResponse(args: MapCollectionResponseArgs): Nullable<Omit<Collection, 'swapsCount'>> {
  const { response, skipContractCheck } = args
  const contract = pipe<[CollectionResponse], CollectionContractResponse[], Nullable<CollectionContractResponse>>(
    prop('contracts'),
    find(propSatisfies(isIn(getSupportedChains()), 'chain'))
  )(response)
  if (isNil(contract) && !skipContractCheck) {
    return undefined
  }
  return applySpec<Omit<Collection, 'swapsCount'>>({
    bannerUrl: pipe(prop('banner_image_url'), removeQueryFromUrl),
    contract: pipe(prop('contract'), mapCollectionContractResponse),
    description: prop('description'),
    discordUrl: prop('discord_url'),
    name: prop('name'),
    profilePictureUrl: pipe(prop('image_url'), removeQueryFromUrl),
    slug: pipe(prop('collection'), toLower, removeSpecialCharacters),
    totalSupply: prop('total_supply'),
    verified: always(false)
  })(assoc('contract', contract, response))
}

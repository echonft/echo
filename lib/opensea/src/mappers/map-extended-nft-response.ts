import type { Contract } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import { mapTraitResponse } from '@echo/opensea/mappers/map-trait-response'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { always, applySpec, ifElse, isNil, map, partialRight, pipe, prop } from 'ramda'

export type MapNftResponseArgs = Omit<NftExtendedResponse, 'contract'> & { contract: Contract }

export interface PartialCollection {
  contract: Contract
  slug: Slug
}

export function mapExtendedNftResponse(response: MapNftResponseArgs): Omit<
  Nft,
  'collection' | 'owner' | 'updatedAt'
> & {
  collection: PartialCollection
} {
  return applySpec<Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & { collection: PartialCollection }>({
    animationUrl: prop('animation_url'),
    attributes: pipe(prop('traits'), ifElse(isNil, always([]), map(mapTraitResponse))),
    collection: applySpec<PartialCollection>({
      contract: prop('contract'),
      slug: prop('collection')
    }),
    name: prop('name'),
    metadataUrl: prop('metadata_url'),
    pictureUrl: pipe(prop('image_url'), unlessNil(removeQueryFromUrl)),
    tokenId: pipe(prop('identifier'), partialRight(parseInt, [10]))
  })(response)
}

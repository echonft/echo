import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { mapTraitResponse } from '@echo/opensea/mappers/map-trait-response'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { always, applySpec, ifElse, isNil, map, partialRight, pipe, prop } from 'ramda'

export function mapExtendedNftResponse(response: NftExtendedResponse): Omit<Nft, 'collection' | 'owner' | 'updatedAt'> {
  return applySpec<Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & { collection: Pick<Collection, 'slug'> }>({
    animationUrl: prop('animation_url'),
    attributes: pipe(prop('traits'), ifElse(isNil, always([]), map(mapTraitResponse))),
    collection: applySpec<Pick<Collection, 'slug'>>({
      slug: prop('collection')
    }),
    name: prop('name'),
    metadataUrl: prop('metadata_url'),
    pictureUrl: pipe(prop('image_url'), unlessNil(removeQueryFromUrl)),
    tokenId: pipe(prop('identifier'), partialRight(parseInt, [10]))
  })(response)
}

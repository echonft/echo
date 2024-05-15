import { getBlurUrlForNft } from '@echo/model/helpers/nft/get-blur-url-for-nft'
import { getOpenSeaUrlForNft } from '@echo/model/helpers/nft/get-open-sea-url-for-nft'
import type { Collection, Contract } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { mapTrait } from '@echo/opensea/mappers/map-trait'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { always, applySpec, converge, ifElse, isNil, map, partialRight, pipe, prop, toLower } from 'ramda'

type MapNftResponseArgs = Omit<NftExtendedResponse, 'contract'> & { contract: Contract }
type PartialCollection = Pick<Collection, 'contract' | 'slug'>

export function mapNftResponse(response: MapNftResponseArgs) {
  return applySpec<Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & { collection: PartialCollection }>({
    animationUrl: pipe(prop('animation_url'), unlessNil(toLower)),
    attributes: pipe(prop('traits'), ifElse(isNil, always([]), map(mapTrait))),
    blurUrl: converge(getBlurUrlForNft, [prop('contract'), prop('identifier')]),
    collection: applySpec<PartialCollection>({
      contract: prop('contract'),
      slug: prop('collection')
    }),
    name: prop('name'),
    metadataUrl: pipe(prop('metadata_url'), unlessNil(toLower)),
    openSeaUrl: ifElse(
      propIsNil<MapNftResponseArgs, 'opensea_url'>('opensea_url'),
      converge(getOpenSeaUrlForNft, [prop('contract'), prop('identifier')]),
      pipe(nonNullableReturn(prop('opensea_url')), toLower)
    ),
    pictureUrl: pipe(prop('image_url'), unlessNil(toLower)),
    tokenId: pipe(prop('identifier'), partialRight(parseInt, [10]))
  })(response)
}

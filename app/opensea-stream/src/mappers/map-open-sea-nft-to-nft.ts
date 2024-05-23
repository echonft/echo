import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { mapTraitResponse } from '@echo/opensea/mappers/map-trait-response'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { always, applySpec, ifElse, isNil, map, partialRight, path, pipe, prop, toLower } from 'ramda'

interface MapOpenSeaNftToNftArgs {
  response: NftExtendedResponse
  owner: User
  collection: Collection
}
export function mapOpenSeaNftToNft(args: MapOpenSeaNftToNftArgs): Omit<Nft, 'updatedAt'> {
  return applySpec<Omit<Nft, 'updatedAt'>>({
    animationUrl: pipe(nonNullableReturn(path(['response', 'animation_url'])), unlessNil(toLower)),
    attributes: pipe(nonNullableReturn(path(['response', 'traits'])), ifElse(isNil, always([]), map(mapTraitResponse))),
    collection: prop('collection'),
    owner: prop('owner'),
    name: nonNullableReturn(path(['response', 'name'])),
    metadataUrl: pipe(nonNullableReturn(path(['response', 'metadata_url'])), unlessNil(toLower)),
    pictureUrl: pipe(nonNullableReturn(path(['response', 'image_url'])), unlessNil(pipe(toLower, removeQueryFromUrl))),
    tokenId: pipe<[MapOpenSeaNftToNftArgs], string, number>(
      nonNullableReturn(path(['response', 'identifier'])),
      partialRight(parseInt, [10])
    )
  })(args)
}

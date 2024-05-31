import type { Nft } from '@echo/model/types/nft'
import { cleanIpfsURI } from '@echo/nft-scan/helpers/clean-ipfs-uri'
import { mapAttributeResponse } from '@echo/nft-scan/mappers/map-attribute-response'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { unlessNilOrEmpty } from '@echo/utils/fp/unless-nil-or-empty'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, applySpec, ifElse, isNil, map, partialRight, pipe, prop } from 'ramda'

export function mapNftResponse(response: NftResponse): Omit<Nft, 'collection' | 'owner' | 'updatedAt'> {
  return applySpec<Omit<Nft, 'collection' | 'owner' | 'updatedAt'>>({
    // FIXME This will always be undefined, should probably remove it
    animationUrl: prop('animation_url'),
    attributes: pipe(prop('attributes'), ifElse(isNil, always([]), map(mapAttributeResponse))),
    name: ifElse<[NftResponse], string, string>(
      pipe(prop('name'), isNilOrEmpty),
      prop('token_id'),
      nonNullableReturn(prop('name'))
    ),
    metadataUrl: pipe<[NftResponse], Nullable<string>, Nullable<string>>(
      prop('token_uri'),
      unlessNilOrEmpty(cleanIpfsURI)
    ),
    pictureUrl: pipe(prop('image_uri'), unlessNilOrEmpty(cleanIpfsURI), unlessNilOrEmpty(removeQueryFromUrl)),
    tokenId: pipe(prop('token_id'), partialRight(parseInt, [10]))
  })(response)
}

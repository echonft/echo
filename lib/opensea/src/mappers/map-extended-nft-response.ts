import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { mapTraitResponse } from '@echo/opensea/mappers/map-trait-response'
import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { always, applySpec, ifElse, isNil, map, partialRight, pipe, prop, toLower } from 'ramda'

export interface MapExtendedNftResponseArgs extends WithLogger {
  response: NftExtendedResponse
  chain: ChainName
}

export function mapExtendedNftResponse(args: MapExtendedNftResponseArgs): Omit<
  Nft,
  'collection' | 'owner' | 'updatedAt'
> & {
  collection: Pick<Collection, 'contract' | 'slug'>
} {
  const { chain, response, logger } = args
  try {
    return applySpec<
      Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & {
        collection: Pick<Collection, 'contract' | 'slug'>
      }
    >({
      animationUrl: prop('animation_url'),
      attributes: pipe(prop('traits'), ifElse(isNil, always([]), map(mapTraitResponse))),
      collection: applySpec<Pick<Collection, 'contract' | 'slug'>>({
        contract: {
          address: pipe(prop('contract'), toLower<HexString>),
          chain: always(chain)
        },
        slug: prop('collection')
      }),
      name: prop('name'),
      metadataUrl: prop('metadata_url'),
      pictureUrl: pipe(prop('image_url'), removeQueryFromUrl),
      tokenId: pipe(prop('identifier'), partialRight(parseInt, [10]))
    })(response)
  } catch (err) {
    logger?.error({ err, fn: mapExtendedNftResponse.name }, 'error mapping NFT response')
    throw err
  }
}

import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { mapAttributeResponse } from '@echo/nft-scan/mappers/map-attribute-response'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import type { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { removeNull } from '@echo/utils/fp/remove-null'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { always, applySpec, ifElse, invoker, isNil, map, pipe, prop } from 'ramda'

export interface MapNftResponseArgs extends WithLogger {
  response: ReturnType<typeof nftResponseSchema.parse>
  chain: ChainName
}

export function mapNftResponse(
  args: MapNftResponseArgs
): Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & Record<'collection', Pick<Collection, 'contract'>> {
  const { response, chain, logger } = args
  try {
    return applySpec<
      Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & Record<'collection', Pick<Collection, 'contract'>>
    >({
      attributes: pipe(prop('attributes'), ifElse(isNil, always([]), map(mapAttributeResponse))),
      collection: applySpec({
        contract: {
          address: prop('contract_address'),
          chain: always(chain)
        }
      }),
      name: ifElse<[NftResponse], string, string>(
        pipe(prop('name'), isNilOrEmpty),
        pipe(prop('token_id'), invoker(0, 'toString')),
        nonNullableReturn(prop('name'))
      ),
      metadataUrl: pipe(prop('token_uri'), removeNull),
      pictureUrl: pipe(prop('image_uri'), removeNull),
      tokenId: prop('token_id')
    })(response)
  } catch (err) {
    logger?.error({ err }, 'error parsing fetch NFT response')
    throw err
  }
}

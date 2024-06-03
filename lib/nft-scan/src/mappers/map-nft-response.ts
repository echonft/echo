import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { mapAttributeResponse } from '@echo/nft-scan/mappers/map-attribute-response'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import type { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import { always, applySpec, ifElse, isNil, map, pipe, prop, toLower } from 'ramda'

export interface MapNftResponseArgs {
  response: ReturnType<typeof nftResponseSchema.parse>
  chain: ChainName
}

export function mapNftResponse(
  args: MapNftResponseArgs
): Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & Record<'collection', Pick<Collection, 'contract'>> {
  const { response, chain } = args
  try {
    return applySpec<
      Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & Record<'collection', Pick<Collection, 'contract'>>
    >({
      attributes: pipe(prop('attributes'), ifElse(isNil, always([]), map(mapAttributeResponse))),
      collection: applySpec({
        contract: {
          address: pipe(prop('contract_address'), toLower),
          chain: always(chain)
        }
      }),
      name: ifElse<[NftResponse], string, string>(
        pipe(prop('name'), isNilOrEmpty),
        prop('token_id'),
        nonNullableReturn(prop('name'))
      ),
      metadataUrl: prop('token_uri'),
      pictureUrl: prop('image_uri'),
      tokenId: prop('token_id')
    })(response)
  } catch (err) {
    pinoLogger.error(`error parsing fetch NFT response: ${errorMessage(err)}`)
    throw err
  }
}

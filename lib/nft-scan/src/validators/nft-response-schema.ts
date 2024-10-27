import type { Chain } from '@echo/model/constants/chain'
import { bigIntStringSchema } from '@echo/model/validators/big-int-string-schema'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { nftAttributeResponseSchema } from '@echo/nft-scan/validators/nft-attribute-response-schema'
import { apiPathProvider } from '@echo/routing/path/api-path-provider'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, applySpec, ifElse, invoker, isNil, length, pipe, prop, reject, split } from 'ramda'
import { object, string, z } from 'zod'

type NftAttributeResponse = z.infer<typeof nftAttributeResponseSchema>
export function nftResponseSchema(chain: Chain) {
  function updateIPFSUri(uri: Nullable<string>): Nullable<string> {
    if (isNil(uri)) {
      return uri
    }
    if (uri.startsWith('data:image')) {
      return uri
    }
    if (uri.startsWith('ipfs://')) {
      return apiPathProvider.ipfs.proxy.getProductionUrl({
        path: uri.slice(7).replace(/\/\//g, '/')
      })
    }
    const splittedUrl = split('://', uri)
    if (length(splittedUrl) === 1) {
      return apiPathProvider.ipfs.proxy.getProductionUrl({ path: uri.replace(/\/\//g, '/') })
    }
    return uri
  }

  return object({
    attributes: nftAttributeResponseSchema
      .array()
      .nullable()
      .transform((attributes) =>
        isNil(attributes) ? ([] as NftAttributeResponse[]) : reject<NftAttributeResponse>(isNil)(attributes)
      ),
    contract_address: evmAddressSchema,
    erc_type: nftTokenTypeSchema,
    image_uri: string()
      .nullable()
      .optional()
      .transform(unlessNil(pipe(updateIPFSUri, removeQueryFromUrl))),
    name: string().nullable().optional(),
    token_id: bigIntStringSchema,
    token_uri: string().nullable().optional().transform(updateIPFSUri)
  }).transform<PartialNft>(
    applySpec<PartialNft>({
      attributes: prop('attributes'),
      collection: applySpec({
        contract: {
          address: prop('contract_address'),
          chain: always(chain)
        }
      }),
      name: ifElse<[NftResponse], string, string>(
        pipe(prop('name'), isNilOrEmpty),
        pipe(prop('token_id'), invoker(0, 'toString')),
        prop('name') as (response: NftResponse) => string
      ),
      pictureUrl: prop('image_uri'),
      tokenId: prop('token_id'),
      type: prop('erc_type')
    })
  )
}

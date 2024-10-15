import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { nftAttributeResponseSchema } from '@echo/nft-scan/validators/nft-attribute-response-schema'
import { convertNullToUndefined } from '@echo/utils/fp/convert-null-to-undefined'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { bigIntStringSchema } from '@echo/utils/validators/big-int-string-schema'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { always, applySpec, ifElse, invoker, isNil, length, pipe, prop, reject, split } from 'ramda'
import { object, string } from 'zod'

export function nftResponseSchema(chain: ChainName) {
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

  const schema = object({
    attributes: nftAttributeResponseSchema
      .array()
      .nullable()
      .transform(ifElse(isNil, always([]), reject(isNil))),
    contract_address: evmAddressSchema,
    erc_type: nftTokenTypeSchema,
    image_uri: string()
      .nullable()
      .optional()
      .transform(unlessNil(pipe(updateIPFSUri, removeQueryFromUrl))),
    name: string().nullable().optional(),
    token_id: bigIntStringSchema,
    token_uri: string().nullable().optional().transform(updateIPFSUri)
  })
  return schema.transform<PartialNft>(
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
        nonNullableReturn(prop('name'))
      ),
      metadataUrl: pipe(prop('token_uri'), convertNullToUndefined),
      pictureUrl: pipe(prop('image_uri'), convertNullToUndefined),
      tokenId: prop('token_id'),
      type: prop('erc_type')
    })
  )
}

import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'
import { nftAttributeResponseSchema } from '@echo/nft-scan/validators/nft-attribute-response-schema'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { removeNull } from '@echo/utils/fp/remove-null'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { bigIntStringSchema } from '@echo/utils/validators/big-int-string-schema'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { always, applySpec, ifElse, invoker, isNil, length, pipe, prop, reject, split } from 'ramda'
import { nativeEnum, object, string } from 'zod'

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
    // amount: intStringSchema,
    attributes: nftAttributeResponseSchema
      .array()
      .nullable()
      .transform(ifElse(isNil, always([]), reject(isNil))),
    // content_type: string().nullable(),
    // content_uri: string().nullable(),
    contract_address: evmAddressSchema,
    // contract_name: string(),
    // contract_token_id: string(),
    // description: string().nullable(),
    erc_type: nativeEnum({
      erc721: 'erc721',
      erc1155: 'erc1155'
    }),
    // external_link: string().nullable(),
    image_uri: string()
      .nullable()
      .optional()
      .transform(unlessNil(pipe(updateIPFSUri, removeQueryFromUrl))),
    // latest_trade_price: number().nullable(),
    // latest_trade_symbol: string().nullable(),
    // latest_trade_timestamp: number().int().positive().nullable(),
    // latest_trade_token: string().nullable(),
    // metadata_json: string().nullable(),
    // mint_price: number().nullable(),
    // mint_timestamp: number().int().positive(),
    // mint_transaction_hash: hexStringSchema,
    // minter: evmAddressSchema,
    name: string().nullable().optional(),
    // nftscan_id: string(),
    // nftscan_uri: string().nullable(),
    // own_timestamp: number().int().positive().nullable(),
    // owner: evmAddressSchema,
    // rarity_rank: number().nullable(),
    // rarity_score: number().nullable(),
    // small_nftscan_uri: string().nullable(),
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
      metadataUrl: pipe(prop('token_uri'), removeNull),
      pictureUrl: pipe(prop('image_uri'), removeNull),
      tokenId: prop('token_id'),
      type: prop('erc_type')
    })
  )
}

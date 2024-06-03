import type { ErcType } from '@echo/nft-scan/types/erc-type'
import { attributeResponseSchema } from '@echo/nft-scan/validators/attribute-response-schema'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Nullable } from '@echo/utils/types/nullable'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { intStringSchema } from '@echo/utils/validators/int-string-schema'
import { concat, either, equals, identity, ifElse, isNil, reject } from 'ramda'
import { z } from 'zod'

function isURI(str: string): boolean {
  try {
    const url = new URL(str)
    return !!url.protocol
  } catch (e) {
    return false
  }
}

function prependIpfsSchema(uri: Nullable<string>): Nullable<string> {
  return unlessNil(ifElse(isURI, identity, concat('ipfs://')))(uri)
}
export const nftResponseSchema = z.object({
  amount: intStringSchema,
  attributes: attributeResponseSchema
    .array()
    .nullable()
    .transform(unlessNil(reject(isNil))),
  content_type: z.string().nullable(),
  content_uri: z.string().nullable(),
  contract_address: evmAddressSchema,
  contract_name: z.string(),
  contract_token_id: z.string(),
  description: z.string().nullable(),
  erc_type: z.custom<ErcType>(either(equals('erc721'), equals('erc1155'))),
  external_link: z.string().nullable(),
  image_uri: z.string().nullable().transform(prependIpfsSchema).transform(unlessNil(removeQueryFromUrl)),
  latest_trade_price: z.number().nullable(),
  latest_trade_symbol: z.string().nullable(),
  latest_trade_timestamp: z.number().int().positive().nullable(),
  latest_trade_token: z.string().nullable(),
  metadata_json: z.string().nullable(),
  mint_price: z.number().nullable(),
  mint_timestamp: z.number().int().positive(),
  mint_transaction_hash: hexStringSchema,
  minter: evmAddressSchema,
  name: z.string().nullable(),
  nftscan_id: z.string(),
  nftscan_uri: z.string().nullable(),
  own_timestamp: z.number().int().positive().nullable(),
  owner: evmAddressSchema,
  rarity_rank: z.number().nullable(),
  rarity_score: z.number().nullable(),
  small_nftscan_uri: z.string().nullable(),
  token_id: intStringSchema,
  token_uri: z.string().nullable().transform(prependIpfsSchema)
})

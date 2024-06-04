import type { ErcType } from '@echo/nft-scan/types/erc-type'
import { nftAttributeResponseSchema } from '@echo/nft-scan/validators/nft-attribute-response-schema'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Nullable } from '@echo/utils/types/nullable'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { intStringSchema } from '@echo/utils/validators/int-string-schema'
import { concat, either, equals, identity, ifElse, isNil, reject } from 'ramda'
import { custom, number, object, string } from 'zod'

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
export const nftResponseSchema = object({
  amount: intStringSchema,
  attributes: nftAttributeResponseSchema
    .array()
    .nullable()
    .transform(unlessNil(reject(isNil))),
  content_type: string().nullable(),
  content_uri: string().nullable(),
  contract_address: evmAddressSchema,
  contract_name: string(),
  contract_token_id: string(),
  description: string().nullable(),
  erc_type: custom<ErcType>(either(equals('erc721'), equals('erc1155'))),
  external_link: string().nullable(),
  image_uri: string().nullable().transform(prependIpfsSchema).transform(unlessNil(removeQueryFromUrl)),
  latest_trade_price: number().nullable(),
  latest_trade_symbol: string().nullable(),
  latest_trade_timestamp: number().int().positive().nullable(),
  latest_trade_token: string().nullable(),
  metadata_json: string().nullable(),
  mint_price: number().nullable(),
  mint_timestamp: number().int().positive(),
  mint_transaction_hash: hexStringSchema,
  minter: evmAddressSchema,
  name: string().nullable(),
  nftscan_id: string(),
  nftscan_uri: string().nullable(),
  own_timestamp: number().int().positive().nullable(),
  owner: evmAddressSchema,
  rarity_rank: number().nullable(),
  rarity_score: number().nullable(),
  small_nftscan_uri: string().nullable(),
  token_id: intStringSchema,
  token_uri: string().nullable().transform(prependIpfsSchema)
})

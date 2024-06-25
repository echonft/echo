import type { ErcType } from '@echo/nft-scan/types/erc-type'
import { collectionAttributesResponseSchema } from '@echo/nft-scan/validators/collection-attributes-response-schema'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { either, equals } from 'ramda'
import { boolean, custom, number, object, string } from 'zod'

export const collectionResponseSchema = object({
  amounts_total: number(),
  attributes: collectionAttributesResponseSchema.array().nullable().optional(),
  banner_url: string().nullable().transform(unlessNil(removeQueryFromUrl)),
  collections_with_same_name: string().array(),
  contract_address: evmAddressSchema,
  deploy_block_number: number(),
  description: string().nullable(),
  discord: string().nullable(),
  email: string().nullable(),
  erc_type: custom<ErcType>(either(equals('erc721'), equals('erc1155'))),
  featured_url: string().nullable(),
  floor_price: number().nullable(),
  github: string().nullable(),
  instagram: string().nullable(),
  is_spam: boolean(),
  items_total: number(),
  large_image_url: string().nullable(),
  logo_url: string().nullable().transform(unlessNil(removeQueryFromUrl)),
  medium: string().nullable(),
  name: string(),
  opensea_floor_price: number().nullable(),
  opensea_slug: string().nullable(),
  opensea_verified: boolean(),
  owner: evmAddressSchema.nullable(),
  owners_total: number(),
  price_symbol: string(),
  royalty: number().nullable(),
  symbol: string(),
  telegram: string().nullable(),
  twitter: string().nullable(),
  verified: boolean(),
  website: string().nullable()
})

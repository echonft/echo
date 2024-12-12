import { addressSchema } from '@echo/model/validators/address-schema'
import { seiAddressSchema } from '@echo/model/validators/sei-address-schema'
import { palletNftResponseSchema } from '@echo/pallet/validators/pallet-nft-response-schema'
import { boolean, nullable, number, object, string } from 'zod'

const traitSchema = object({
  type: string(),
  value: string(),
  display_type: nullable(string()),
  num_tokens_with_trait: number()
})

const ownerInfoSchema = object({
  pfp: nullable(string().url()),
  domain: nullable(string()),
  evm_address: nullable(addressSchema),
  sei_address: seiAddressSchema
})

const auctionInfoSchema = nullable(
  object({
    price: number(),
    expiration: string().datetime()
  })
)

export const extendedPalletNftResponseSchema = palletNftResponseSchema.extend({
  description: nullable(string()),
  owner_info: ownerInfoSchema,
  auction_info: auctionInfoSchema,
  traits: nullable(traitSchema.array()),
  hidden: boolean()
})

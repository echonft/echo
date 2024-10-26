import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { number, object, string } from 'zod'

export const contractResponseSchema = object({
  address: evmAddressSchema,
  chain: string(),
  collection: slugSchema,
  contract_standard: nftTokenTypeSchema,
  name: string(),
  total_supply: number().optional()
})

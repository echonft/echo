import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { nftTokenTypeSchema } from '@echo/utils/validators/nft-token-type-schema'
import { number, object, string } from 'zod'

export const contractResponseSchema = object({
  address: evmAddressSchema,
  chain: string(),
  collection: string(),
  contract_standard: nftTokenTypeSchema,
  name: string(),
  total_supply: number().optional()
})

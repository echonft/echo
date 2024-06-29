import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { nativeEnum, number, object, string } from 'zod'

export const contractResponseSchema = object({
  address: evmAddressSchema,
  chain: string(),
  collection: string(),
  contract_standard: nativeEnum({
    erc721: 'erc721',
    erc1155: 'erc1155'
  }),
  name: string(),
  total_supply: number().optional()
})

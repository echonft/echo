import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { z } from 'zod'

export const getAllNftsByAccountDataResponseSchema = z.object({
  code: z.number(),
  msg: z.string().nullable(),
  data: z
    .object({
      assets: nftResponseSchema.array(),
      contract_address: evmAddressSchema,
      contract_name: z.string(),
      description: z.string(),
      floor_price: z.number().nullable(),
      is_spam: z.boolean(),
      items_total: z.number(),
      logo_url: z.string().nullable().transform(unlessNil(removeQueryFromUrl)),
      opensea_verified: z.boolean(),
      owns_total: z.number(),
      symbol: z.string(),
      verified: z.boolean()
    })
    .array()
})

import { baseResponseAugmentation } from '@echo/nft-scan/validators/base-response-augmentation'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { boolean, number, object, string } from 'zod'

export const getAllNftsByAccountResponseSchema = object({
  data: object({
    assets: nftResponseSchema.array(),
    contract_address: evmAddressSchema,
    contract_name: string(),
    description: string(),
    floor_price: number().nullable(),
    is_spam: boolean(),
    items_total: number(),
    logo_url: string().nullable().transform(unlessNil(removeQueryFromUrl)),
    opensea_verified: boolean(),
    owns_total: number(),
    symbol: string(),
    verified: boolean()
  }).array()
}).extend(baseResponseAugmentation)

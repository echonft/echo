import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { intStringSchema } from '@echo/model/validators/int-string-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { emptyStringToUndefined } from '@echo/opensea/helpers/empty-string-to-undefined'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { pipe } from 'ramda'
import { boolean, object, string } from 'zod'

export const nftResponseAugmentation = {
  identifier: intStringSchema,
  collection: slugSchema,
  contract: evmAddressSchema,
  token_standard: nftTokenTypeSchema,
  name: string().nullable().transform(emptyStringToUndefined),
  description: string().nullable().transform(emptyStringToUndefined),
  image_url: string()
    .or(string().url())
    .nullable()
    .optional()
    .transform(pipe(emptyStringToUndefined, removeQueryFromUrl)),
  opensea_url: string().or(string().url()).nullable().optional().transform(emptyStringToUndefined),
  updated_at: string(), // there's no 'Z' at the end of the string so it's not a valid datetime
  is_disabled: boolean(),
  is_nsfw: boolean()
}
export const nftResponseSchema = object(nftResponseAugmentation)

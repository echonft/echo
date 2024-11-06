import { addressSchema } from '@echo/model/validators/address-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { number, object, string } from 'zod'

export const collectionSchema = object({
  contract: addressSchema,
  description: string().min(1).optional(),
  discordUrl: string().url().optional(),
  name: string().min(1),
  pictureUrl: string().url().optional(), // TODO add without query params
  slug: slugSchema,
  totalSupply: number().int().positive(),
  twitterUsername: string().min(1).optional(),
  type: nftTokenTypeSchema,
  websiteUrl: string().url().optional()
})

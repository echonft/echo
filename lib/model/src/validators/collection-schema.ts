import { contractSchema } from '@echo/model/validators/contract-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { boolean, number, object, string } from 'zod'

export const collectionSchema = object({
  contract: contractSchema,
  description: string().min(1).optional(),
  discordUrl: string().url().optional(),
  name: string().min(1),
  pictureUrl: string().url().optional(), // TODO add without query params
  slug: slugSchema,
  totalSupply: number().int().positive(),
  twitterUsername: string().min(1).optional(),
  type: nftTokenTypeSchema,
  verified: boolean(),
  websiteUrl: string().url().optional()
})

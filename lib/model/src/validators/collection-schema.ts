import { serializeCollection } from '@echo/model/serializers/serialize-collection'
import type { CollectionIndex } from '@echo/model/types/collection'
import { addressSchema } from '@echo/model/validators/address-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { slugSchema, withSlugSchema } from '@echo/model/validators/slug-schema'
import { ipfsSchema } from '@echo/utils/validators/ipfs-schema'
import { objOf } from 'ramda'
import { number, object, string } from 'zod'

export const collectionSchema = object({
  contract: addressSchema,
  description: string().min(1).optional(),
  discordUrl: string().url().optional(),
  name: string().min(1),
  pictureUrl: string().url().or(ipfsSchema).optional(),
  slug: slugSchema,
  totalSupply: number().int().positive(),
  twitterUsername: string().min(1).optional(),
  type: nftTokenTypeSchema,
  websiteUrl: string().url().optional()
})

export const serializeCollectionSchema = withSlugSchema.transform(serializeCollection)

export const serializedCollectionSchema = slugSchema.transform<CollectionIndex>(objOf('slug'))

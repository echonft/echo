import { TokenType } from '@echo/model/constants/token-type'
import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { NftIndex } from '@echo/model/types/nft'
import { collectionSchema } from '@echo/model/validators/collection-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { userSchema } from '@echo/model/validators/user-schema'
import { applySpec, head, last, partialRight, pipe, split } from 'ramda'
import { literal, number, object, string } from 'zod'

export const nftAttributeSchema = object({
  trait: string().min(1),
  value: string().min(1)
})

export const nftSchema = object({
  attributes: nftAttributeSchema.array(),
  collection: collectionSchema.pick({ contract: true, name: true, slug: true, totalSupply: true }),
  name: string().min(1),
  owner: userSchema.optional(),
  pictureUrl: string().url().optional(), // TODO add without query params
  tokenId: number().int().positive(),
  type: nftTokenTypeSchema
})

export const nftIndexSchema = object({
  collection: withSlugSchema,
  tokenId: number().int().positive()
})

export const ownedNftSchema = nftSchema.omit({ owner: true }).extend({ owner: userSchema })

export const ownedNftIndexSchema = nftIndexSchema.extend({ owner: userSchema })

export const erc721NftSchema = nftSchema.omit({ type: true }).extend({ type: literal(TokenType.Erc721) })

export const ownedErc721NftSchema = ownedNftSchema.omit({ type: true }).extend({ type: literal(TokenType.Erc721) })

export const erc1155NftSchema = nftSchema.omit({ type: true }).extend({ type: literal(TokenType.Erc1155) })

export const ownedErc1155NftSchema = ownedNftSchema.omit({ type: true }).extend({ type: literal(TokenType.Erc1155) })

export const serializeNftSchema = nftIndexSchema.transform(serializeNft)

export const serializedNftSchema = string()
  .regex(/^[a-z0-9-_]+\.[1-9][0-9]*$/)
  .transform<NftIndex>((serialized) => {
    return pipe(
      split('.'),
      applySpec<NftIndex>({
        collection: {
          slug: head
        },
        tokenId: pipe(last, partialRight(parseInt, [10]))
      })
    )(serialized)
  })

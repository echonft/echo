import { TokenType } from '@echo/model/constants/token-type'
import { collectionSchema } from '@echo/model/validators/collection-schema'
import { contractSchema } from '@echo/model/validators/contract-schema'
import { nftIndexSchema, nftSchema } from '@echo/model/validators/nft-schema'
import { tokenTypeSchema } from '@echo/model/validators/token-type-schema'
import { literal, number, object, string } from 'zod'

export const tokenSchema = object({
  contract: contractSchema,
  name: string().min(1),
  type: tokenTypeSchema
})

export const erc20TokenSchema = tokenSchema.omit({ type: true }).extend({
  decimals: number().int().gte(0),
  type: literal(TokenType.Erc20)
})

export const erc20TokenIndexSchema = erc20TokenSchema.pick({ contract: true, type: true })

export const erc721TokenSchema = tokenSchema.omit({ type: true }).extend({
  collection: collectionSchema.pick({ name: true, slug: true, totalSupply: true }),
  name: nftSchema.shape.name,
  owner: nftSchema.shape.owner,
  pictureUrl: nftSchema.shape.pictureUrl,
  tokenId: nftSchema.shape.tokenId,
  type: literal(TokenType.Erc721)
})

export const erc721TokenIndexSchema = nftIndexSchema.extend({ type: literal(TokenType.Erc721) })

export const erc1155TokenSchema = tokenSchema.omit({ type: true }).extend({
  collection: collectionSchema.pick({ name: true, slug: true, totalSupply: true }),
  name: nftSchema.shape.name,
  owner: nftSchema.shape.owner,
  pictureUrl: nftSchema.shape.pictureUrl,
  tokenId: nftSchema.shape.tokenId,
  type: literal(TokenType.Erc1155)
})

export const erc1155TokenIndexSchema = nftIndexSchema.extend({ type: literal(TokenType.Erc1155) })

export const nftTokenSchema = erc721TokenSchema.or(erc1155TokenSchema)

export const tokenBalanceSchema = object({
  token: erc20TokenSchema.or(erc1155TokenSchema),
  balance: number()
})

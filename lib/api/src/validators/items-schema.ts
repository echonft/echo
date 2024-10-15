import { ItemError } from '@echo/model/constants/errors/item-error'
import { erc1155TokenType, erc20TokenType, erc721TokenType } from '@echo/model/constants/token-types'
import { withSlugSchema } from '@echo/model/validators/slug-schema'
import { walletSchema } from '@echo/model/validators/wallet-schema'
import { both, isNotEmpty, pipe, prop } from 'ramda'
import { literal, number, object } from 'zod'

const nftTokenAugmentation = {
  collection: withSlugSchema,
  tokenId: number().int().positive()
}

const erc721TokenSchema = object({
  type: literal(erc721TokenType)
}).extend(nftTokenAugmentation)

const erc721TokenItemSchema = object({
  token: erc721TokenSchema,
  quantity: literal(1)
})

const erc1155TokenSchema = object({
  type: literal(erc1155TokenType)
}).extend(nftTokenAugmentation)

const erc1155TokenItemSchema = object({
  token: erc1155TokenSchema,
  quantity: number().int().positive()
})

const erc20TokenSchema = object({
  contract: walletSchema,
  type: literal(erc20TokenType)
})

const erc20TokenItemSchema = object({
  token: erc20TokenSchema,
  quantity: number().int().positive()
})

export const itemsSchema = object({
  erc20: erc20TokenItemSchema.array(),
  erc721: erc721TokenItemSchema.array(),
  erc1155: erc1155TokenItemSchema.array()
}).refine(both(pipe(prop('erc721'), isNotEmpty), pipe(prop('erc1155'), isNotEmpty)), ItemError.Erc20Only)

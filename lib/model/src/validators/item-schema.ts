import {
  erc1155TokenIndexSchema,
  erc1155TokenSchema,
  erc20TokenIndexSchema,
  erc20TokenSchema,
  erc721TokenIndexSchema,
  erc721TokenSchema
} from '@echo/model/validators/token-schema'
import { number, object } from 'zod'

export const itemSchema = object({
  token: erc20TokenSchema.or(erc721TokenSchema).or(erc1155TokenSchema)
})

export const erc20ItemSchema = object({
  token: erc20TokenSchema,
  quantity: number().positive()
})

export const erc20ItemIndexSchema = object({
  token: erc20TokenIndexSchema,
  quantity: number().positive()
})

export const erc721ItemSchema = object({
  token: erc721TokenSchema
})

export const erc721ItemIndexSchema = object({
  token: erc721TokenIndexSchema
})

export const erc1155ItemSchema = object({
  token: erc1155TokenSchema,
  quantity: number().int().positive()
})

export const erc1155ItemIndexSchema = object({
  token: erc1155TokenIndexSchema,
  quantity: number().int().positive()
})

export const nftItemSchema = erc721ItemSchema.or(erc1155ItemSchema)

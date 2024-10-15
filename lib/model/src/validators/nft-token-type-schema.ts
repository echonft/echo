import { erc1155TokenType, erc721TokenType } from '@echo/model/constants/token-types'
import { z } from 'zod'

export const nftTokenTypeSchema = z.enum([erc721TokenType, erc1155TokenType])

import { TokenType } from '@echo/model/constants/token-type'
import { z } from 'zod'

export const nftTokenTypeSchema = z.enum([TokenType.Erc721, TokenType.Erc1155]).readonly()

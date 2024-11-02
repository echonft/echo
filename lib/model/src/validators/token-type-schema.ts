import { TokenType } from '@echo/model/constants/token-type'
import { z } from 'zod'

export const tokenTypeSchema = z.nativeEnum(TokenType)

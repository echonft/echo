import { Chain } from '@echo/utils/constants/chain'
import { nativeEnum } from 'zod'

export const chainSchema = nativeEnum(Chain)

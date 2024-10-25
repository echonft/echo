import { Chain } from '@echo/model/constants/chain'
import { nativeEnum } from 'zod'

export const chainSchema = nativeEnum(Chain).readonly()

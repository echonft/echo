import { isIn } from '@echo/utils/fp/is-in'
import { getChains } from '@echo/utils/helpers/chains/get-chains'
import type { Chain } from '@echo/utils/constants/chain'
import { string } from 'zod'

export const chainSchema = string()
  .refine<string>(function (arg: string): arg is string {
    return isIn(getChains(), arg)
  }, 'Invalid chain')
  .transform((value) => value as Chain)

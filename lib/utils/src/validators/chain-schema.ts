import { isIn } from '@echo/utils/fp/is-in'
import { getChains } from '@echo/utils/helpers/get-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import { string } from 'zod'

export const chainSchema = string()
  .refine<string>(function (arg: string): arg is string {
    return isIn(getChains(), arg)
  }, 'Invalid chain')
  .transform((value) => value as ChainName)

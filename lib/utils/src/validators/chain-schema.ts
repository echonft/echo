import { CHAINS } from '@echo/utils/constants/chains/chains'
import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'
import { string } from 'zod'

export const chainSchema = string()
  .refine<string>(function (arg: string): arg is string {
    return isIn(CHAINS, arg)
  }, 'Invalid chain')
  .transform((value) => value as ChainName)

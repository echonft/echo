import { CHAINS } from '@echo/utils/constants/chains/chains'
import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'
import { z } from 'zod'

export const chainSchema = z
  .string()
  .refine<string>(function (arg: string): arg is string {
    return isIn(CHAINS, arg)
  }, 'Invalid chain')
  .transform((value) => value as ChainName)

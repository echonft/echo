import { getChain } from '@echo/web3/helpers/get-chain'
import { z } from 'zod'

export const chainIdSchema = z.number().refine<number>(function (arg: number): arg is number {
  return arg === getChain().id
}, 'Invalid chain id')

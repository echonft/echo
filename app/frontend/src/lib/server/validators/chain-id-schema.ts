import isIn from '@echo/utils/is-in'
import supportedChains from '@echo/utils/supported-chains'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const chainIdSchema = z.number().refine((val: number) => isIn(supportedChains)(val), 'Invalid chain id')

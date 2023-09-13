import { supportedChains } from '@echo/utils/constants/supported-chains'
import { isIn } from '@echo/utils/fp/is-in'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const chainIdSchema = z.number().refine((val: number) => isIn(supportedChains)(val), 'Invalid chain id')

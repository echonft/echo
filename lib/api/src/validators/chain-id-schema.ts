import { isIn, supportedChains } from '@echo/utils'
import { both, is } from 'ramda'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const chainIdSchema = z.custom<number>(both(is(Number), isIn(supportedChains)), 'Invalid chain id')

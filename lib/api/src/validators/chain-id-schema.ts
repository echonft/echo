import { supportedChains } from '@echo/utils'
import { both, includes, is } from 'ramda'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const chainIdSchema = z.custom<number>(both(is(Number), includes(supportedChains)), 'Invalid chain id')

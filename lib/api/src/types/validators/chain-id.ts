import { supportedChains } from '@echo/utils'
import { map, toString } from 'ramda'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const chainId = z.enum(map(toString, supportedChains))

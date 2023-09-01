import { isAddress } from 'viem'
import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const addressSchema = z.custom<string>(isAddress, 'Invalid Address')

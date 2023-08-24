import { isAddress } from 'ethers'
import { z } from 'zod'

export const addressSchema = z.custom<string>((val) => isAddress(val as string), 'Invalid Address')

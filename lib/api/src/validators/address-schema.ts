import { isAddress } from 'ethers'
import { z } from 'zod'

export const addressSchema = z.custom<string>(isAddress, 'Invalid Address')

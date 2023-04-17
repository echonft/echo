import { isAddress } from 'ethers/lib/utils'
import { z } from 'zod'

export const address = z.custom<string>((val) => isAddress(val as string), 'Invalid Address')

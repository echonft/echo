import { z } from 'zod'

// TODO should there be a max value too?
export const chainId = z.number().gte(1)

import { isAddress } from '@echo/utils/helpers/is-address'
import { z } from 'zod'

export const addressSchema = z.custom<string>(isAddress as (address: unknown) => boolean, 'Invalid Address')

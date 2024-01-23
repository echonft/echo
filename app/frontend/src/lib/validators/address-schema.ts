import { type HexString } from '@echo/utils/types/hex-string'
import { isAddress } from '@echo/web3/helpers/is-address'
import { z } from 'zod'

export const addressSchema = z.custom<HexString>(isAddress as (address: unknown) => boolean, 'Invalid Address')

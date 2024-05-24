import { addressSchema } from '@echo/frontend/lib/validators/address-schema'
import { chainSchema } from '@echo/frontend/lib/validators/chain-schema'
import type { Wallet } from '@echo/model/types/wallet'
import type { HexString } from '@echo/utils/types/hex-string'
import { modify, toLower } from 'ramda'
import { z } from 'zod'

export const walletSchema = z
  .object({
    chain: chainSchema,
    address: addressSchema
  })
  .transform<Wallet>(modify<'address', HexString, Lowercase<HexString>>('address', toLower<HexString>))

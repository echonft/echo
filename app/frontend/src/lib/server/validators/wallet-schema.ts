import { addressSchema } from '@echo/frontend/lib/server/validators/address-schema'
import { chainIdSchema } from '@echo/frontend/lib/server/validators/chain-id-schema'
import type { Wallet } from '@echo/model/types/wallet'
import type { HexString } from '@echo/utils/types/hex-string'
import { modify, toLower } from 'ramda'
import { z } from 'zod'

export const walletSchema = z
  .object({
    chainId: chainIdSchema,
    address: addressSchema
  })
  .transform<Wallet>(modify<'address', HexString, Lowercase<HexString>>('address', toLower<HexString>))

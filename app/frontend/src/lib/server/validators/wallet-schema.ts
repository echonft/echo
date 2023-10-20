import { addressSchema } from '@echo/frontend/lib/server/validators/address-schema'
import { chainIdSchema } from '@echo/frontend/lib/server/validators/chain-id-schema'
import { type Wallet } from '@echo/model/types/wallet'
import { applySpec, converge, prop } from 'ramda'
import { getAddress } from 'viem'
import { z } from 'zod'

export const walletSchema = z
  .object({
    chainId: chainIdSchema,
    address: addressSchema
  })
  .transform(
    applySpec<Wallet>({
      chainId: prop('chainId'),
      address: converge(getAddress, [prop('address'), prop('chainId')])
    })
  )

import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { addressSchema } from '@server/validators/address-schema'
import { chainIdSchema } from '@server/validators/chain-id-schema'
import { applySpec, converge, prop } from 'ramda'
import { getAddress } from 'viem'
import { z } from 'zod'

export const walletSchema = z
  .object({
    chainId: chainIdSchema,
    address: addressSchema
  })
  .transform(
    applySpec<WalletData>({
      chainId: prop('chainId'),
      address: converge(getAddress, [prop('address'), prop('chainId')])
    })
  )

import { chainSchema } from '@echo/model/validators/chain-schema'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { object } from 'zod'

export const contractAugmentation = {
  address: evmAddressSchema,
  chain: chainSchema
}

export const contractSchema = object(contractAugmentation)

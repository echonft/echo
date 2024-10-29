import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { nativeEnum, object } from 'zod'

export const walletSchema = object({
  address: evmAddressSchema,
  vm: nativeEnum(VirtualMachine)
})

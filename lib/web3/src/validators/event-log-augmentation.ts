import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { bigint, boolean, number } from 'zod'

export const eventLogAugmentation = {
  address: evmAddressSchema,
  blockHash: hexStringSchema.nullable(),
  blockNumber: bigint().transform(Number),
  logIndex: number().nullable(),
  transactionHash: hexStringSchema.nullable(),
  transactionIndex: number().nullable(),
  removed: boolean()
}

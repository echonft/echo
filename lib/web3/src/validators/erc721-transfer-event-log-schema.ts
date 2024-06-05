import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { eventLogAugmentation } from '@echo/web3/validators/event-log-augmentation'
import { dissoc, pipe } from 'ramda'
import { bigint, object, string } from 'zod'

export const erc721TransferEventLogSchema = object({
  topics: hexStringSchema.array().length(4),
  data: string().startsWith('0x'),
  args: object({
    from: evmAddressSchema,
    to: evmAddressSchema,
    tokenId: bigint().transform(Number)
  })
})
  .extend(eventLogAugmentation)
  .transform(pipe(dissoc('topics'), dissoc('data'), dissoc('logIndex'), dissoc('transactionIndex'), dissoc('removed')))

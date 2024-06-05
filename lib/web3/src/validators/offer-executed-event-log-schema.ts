import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { eventLogAugmentation } from '@echo/web3/validators/event-log-augmentation'
import { dissoc, pipe } from 'ramda'
import { object, string } from 'zod'

export const offerExecutedEventLogSchema = object({
  topics: hexStringSchema.array().length(2),
  data: string().startsWith('0x'),
  args: object({
    offerId: hexStringSchema
  })
})
  .extend(eventLogAugmentation)
  .transform(pipe(dissoc('topics'), dissoc('data'), dissoc('logIndex'), dissoc('transactionIndex'), dissoc('removed')))

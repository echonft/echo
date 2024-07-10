import { logSchema } from '@echo/frontend/lib/validators/log-schema'
import { array, object } from 'zod'

export const blockDataSchema = object({
  // blockHash: hexStringSchema,
  // blockNumber: hexStringSchema,
  // // Note we use string here because it seems like it's sometimes empty. We don't use it anyway
  // contractAddress: string().optional(),
  // cumulativeGasUsed: hexStringSchema,
  // effectiveGasPrice: hexStringSchema,
  // from: hexStringSchema,
  // gasUsed: hexStringSchema,
  logs: array(logSchema)
  // logsBloom: hexStringSchema,
  // status: hexStringSchema,
  // to: hexStringSchema,
  // transactionHash: hexStringSchema,
  // transactionIndex: hexStringSchema,
  // type: hexStringSchema
})

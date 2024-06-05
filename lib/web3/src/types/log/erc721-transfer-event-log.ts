import { erc721TransferEventLogSchema } from '@echo/web3/validators/erc721-transfer-event-log-schema'

export type Erc721TransferEventLog = ReturnType<typeof erc721TransferEventLogSchema.parse>

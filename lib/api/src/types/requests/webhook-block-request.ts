import type { HexString } from '@echo/utils/types/hex-string'

interface LogRequest {
  address: HexString
  blockHash: HexString
  blockNumber: HexString
  data: string
  logIndex: HexString
  removed: boolean
  topics: HexString[]
  transactionHash: HexString
  transactionIndex: HexString
}

export interface BlockDataRequest {
  blockHash: HexString
  blockNumber: HexString
  contractAddress: string
  cumulativeGasUsed: HexString
  effectiveGasPrice: HexString
  from: HexString
  gasUsed: HexString
  logs: LogRequest[]
  logsBloom: HexString
  status: HexString
  to: HexString
  transactionHash: HexString
  transactionIndex: HexString
  type: HexString
}

export type WebhookBlockRequest = BlockDataRequest[]

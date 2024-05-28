import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import type { EchoOfferExecutedLog } from '@echo/web3/types/log/echo-offer-executed-log'
import { decodeEventLog } from 'viem'

export function decodeOfferExecutedLog(log: EchoOfferExecutedLog) {
  return decodeEventLog({
    abi: ECHO_ABI,
    eventName: log.eventName,
    topics: log.topics,
    data: log.data
  })
}

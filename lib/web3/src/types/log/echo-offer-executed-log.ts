import type { OfferExecutedAbiEvent } from '@echo/web3/constants/echo-events/offer-executed-abi-event'
import type { Log } from 'viem'

export type EchoOfferExecutedLog = Log<bigint, number, false, OfferExecutedAbiEvent>

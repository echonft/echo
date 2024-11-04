import type { Address } from '@echo/model/types/address'
import type { HexString } from '@echo/utils/types/hex-string'
import { EchoEventType } from '@echo/web3/constants/echo-event-type'

export interface EchoEvent {
  transactionHash: HexString
  offerId: HexString
  type: EchoEventType
  from?: Address
}

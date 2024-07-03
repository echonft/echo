import type { EchoEventType } from '@echo/frontend/lib/types/echo-event/echo-event-type'
import type { EvmAddress } from '@echo/model/types/evm-address'
import type { HexString } from '@echo/utils/types/hex-string'

export interface EchoEvent {
  transactionHash: HexString
  offerId: HexString
  type: EchoEventType
  from?: EvmAddress
}

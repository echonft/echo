import type { ECHO_EVENT_TYPES } from '@echo/frontend/lib/constants/echo-event-types'
import type { EvmAddress } from '@echo/model/types/evm-address'
import type { HexString } from '@echo/utils/types/hex-string'

export interface EchoEvent {
  transactionHash: HexString
  offerId: HexString
  type: (typeof ECHO_EVENT_TYPES)[keyof typeof ECHO_EVENT_TYPES]
  from?: EvmAddress
}

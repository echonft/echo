import type { EvmAddress } from '@echo/model/types/evm-address'
import type { HexString } from '@echo/utils/types/hex-string'
import type { echoEventTypes } from '@echo/web3/constants/echo-event-types'

export interface EchoEvent {
  transactionHash: HexString
  offerId: HexString
  type: (typeof echoEventTypes)[keyof typeof echoEventTypes]
  from?: EvmAddress
}

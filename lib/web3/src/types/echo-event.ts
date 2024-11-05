import type { Address } from '@echo/model/types/address'
import type { HexString } from '@echo/model/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { EchoEventType } from '@echo/web3/constants/echo-event-type'

export interface EchoEvent {
  transactionHash: Lowercase<HexString>
  type: EchoEventType
  offerId: Lowercase<HexString>
  from: Nullable<Address>
}

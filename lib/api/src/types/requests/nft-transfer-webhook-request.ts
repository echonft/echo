import type { WebhookRequest } from '@echo/api/types/requests/webhook-request'
import type { HexString } from '@echo/utils/types/hex-string'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface NftTransferWebhookRequestLog {
  data: HexString
  account: {
    address: HexString
  }
  transaction: {
    hash: HexString
    from: {
      address: HexString
    }
    to: {
      address: HexString
    }
  }
}

export type NftTransferWebhookRequest = WebhookRequest<{
  block: {
    logs: NonEmptyArray<NftTransferWebhookRequestLog>
  }
}>

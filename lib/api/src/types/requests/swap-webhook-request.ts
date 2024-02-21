import type { WebhookRequest } from '@echo/api/types/requests/webhook-request'
import type { HexString } from '@echo/utils/types/hex-string'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export interface SwapWebhookRequestLog {
  data: HexString
  transaction: {
    hash: HexString
  }
}

export type SwapWebhookRequest = WebhookRequest<{
  block: {
    logs: NonEmptyArray<SwapWebhookRequestLog>
  }
}>

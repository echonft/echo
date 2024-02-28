import type { WithId } from '@echo/model/types/with-id'

export interface WebhookRequest<T> extends WithId {
  webhookId: string
  createdAt: string
  type: string
  event: {
    data: T
    sequenceNumber: number
  }
}

export interface WebhookRequest<T> {
  webhookId: string
  id: string
  createdAt: string
  type: string
  event: {
    data: T
    sequenceNumber: number
  }
}

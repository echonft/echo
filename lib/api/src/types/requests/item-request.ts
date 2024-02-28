import type { WithId } from '@echo/model/types/with-id'

export interface ItemRequest {
  amount: number
  nft: WithId
}

import type { WithId } from '@echo/model/types/with-id'

export interface ItemRequest {
  // we only support ERC721 for now
  // amount: number
  nft: WithId
}

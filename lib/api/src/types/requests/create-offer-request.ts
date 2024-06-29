import type { NftIndex } from '@echo/model/types/nft'

export interface CreateOfferRequest {
  receiverItems: NftIndex[]
  senderItems: NftIndex[]
  expiresAt: number
}

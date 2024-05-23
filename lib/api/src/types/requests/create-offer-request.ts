import type { NftIndex } from '@echo/model/types/nft-index'

export interface CreateOfferRequest {
  receiverItems: NftIndex[]
  senderItems: NftIndex[]
  expiresAt: number
}

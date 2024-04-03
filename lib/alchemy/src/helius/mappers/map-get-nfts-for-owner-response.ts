import { mapNftItem } from '@echo/alchemy/helius/mappers/map-nft-item'
import type { HeliusGetNftsForOwnerResponse } from '@echo/alchemy/helius/types/response/helius-get-nfts-for-owner-response'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'

export function mapGetNftsForOwnerResponse(response: HeliusGetNftsForOwnerResponse, owner: User): Nft[] {
  return response.items.map((item) => mapNftItem(item, owner))
}

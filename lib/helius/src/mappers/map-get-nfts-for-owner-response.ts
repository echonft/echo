import { mapNftItem } from '@echo/helius/mappers/map-nft-item'
import type { GetNftsForOwnerResponse } from '@echo/helius/types/response/get-nfts-for-owner-response'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'

export function mapGetNftsForOwnerResponse(owner: User) {
  return function (response: GetNftsForOwnerResponse): Nft[] {
    return response.items.map((item) => mapNftItem(item, owner))
  }
}

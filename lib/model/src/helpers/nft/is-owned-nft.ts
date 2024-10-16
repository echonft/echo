import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

export function isOwnedNft(nft: Nft): nft is OwnedNft {
  return !propIsNil('owner', nft)
}

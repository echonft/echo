import type { Nft, OwnedNft } from '@echo/model/types/nft'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

export function isOwnedNft(nft: Nft): nft is OwnedNft {
  return !propIsNil('owner', nft)
}

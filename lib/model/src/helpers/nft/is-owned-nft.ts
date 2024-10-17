import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'

export function isOwnedNft(nft: Nft): nft is OwnedNft {
  return propIsNotNil('owner', nft)
}

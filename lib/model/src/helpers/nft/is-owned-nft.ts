import type { Nft } from '@echo/model/types/nft'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'

export function isOwnedNft(nft: Nft): nft is OwnedNft {
  return propIsNotNil('owner', nft)
}

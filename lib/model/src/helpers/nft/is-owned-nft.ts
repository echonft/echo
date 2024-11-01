import type { Nft, OwnedNft } from '@echo/model/types/nft'
import { propIsNotNil } from '@echo/utils/helpers/prop-is-not-nil'

export function isOwnedNft(nft: Nft): nft is OwnedNft {
  return propIsNotNil('owner', nft)
}

import type { Nft } from '@echo/model/types/nft'
import type { Selectable } from '@echo/ui/types/selectable'
import { dissoc, isNil } from 'ramda'

export function enableAction(nft: Nft): Nft {
  if (isNil(nft.action)) {
    return nft
  }
  return dissoc('actionDisabled', nft) as Nft
}

import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { dissoc, isNil } from 'ramda'

export function enableAction(nft: SelectableNft): SelectableNft {
  if (isNil(nft.action)) {
    return nft
  }
  return dissoc('actionDisabled', nft) as SelectableNft
}

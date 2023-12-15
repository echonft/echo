import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { dissoc } from 'ramda'

export function enableAction(nft: SelectableNft) {
  return dissoc('actionDisabled', nft) as SelectableNft
}

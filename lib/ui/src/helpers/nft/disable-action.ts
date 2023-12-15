import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { assoc } from 'ramda'

export function disableAction(nft: SelectableNft) {
  return assoc('actionDisabled', true, nft)
}

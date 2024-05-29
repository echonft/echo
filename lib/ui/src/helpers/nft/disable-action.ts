import type { Nft } from '@echo/model/types/nft'
import type { Selectable } from '@echo/ui/types/selectable'
import { assoc } from 'ramda'

export function disableAction(nft: Nft): Nft {
  return assoc('actionDisabled', true, nft)
}

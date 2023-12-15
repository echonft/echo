import type { AuthUser } from '@echo/model/types/auth-user'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { assoc, dissoc, isNil } from 'ramda'

export function setSelectableNftSelectionDisabledPropFromAuthUser(user: AuthUser | undefined) {
  return function (nft: SelectableNft) {
    if (!isNil(user) && user.username === nft.owner.username) {
      return assoc('selectionDisabled', true, nft)
    }
    return dissoc('selectionDisabled', nft) as SelectableNft
  }
}

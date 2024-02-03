import type { AuthUser } from '@echo/model/types/auth-user'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, dissoc, isNil } from 'ramda'

export function setSelectableNftSelectionDisabledPropFromAuthUser(user: Nullable<AuthUser>) {
  return function (nft: SelectableNft) {
    if (!isNil(user) && user.username === nft.owner.username) {
      return assoc('selectionDisabled', true, nft)
    }
    return dissoc('selectionDisabled', nft) as SelectableNft
  }
}

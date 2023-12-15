import type { AuthUser } from '@echo/model/types/auth-user'
import { disableAction } from '@echo/ui/helpers/nft/disable-action'
import { enableAction } from '@echo/ui/helpers/nft/enable-action'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isNil } from 'ramda'

export function setSelectableNftActionDisabledPropFromAuthUser(user: AuthUser | undefined) {
  return function (nft: SelectableNft) {
    if (!isNil(user) && user.username === nft.owner.username) {
      return disableAction(nft)
    }
    return enableAction(nft)
  }
}

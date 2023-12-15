import type { User } from '@echo/model/types/user'
import { disable } from '@echo/ui/helpers/disableable/disable'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isNil, pathEq, unless } from 'ramda'

function internalFn(owner: User) {
  return function (nft: SelectableNft) {
    return unless(pathEq(owner.username, ['owner', 'username']), disable<SelectableNft>)(nft)
  }
}

export function setSelectableNftDisabledPropFromOwner(owner: User, nft: SelectableNft): SelectableNft
export function setSelectableNftDisabledPropFromOwner(owner: User): (nft: SelectableNft) => SelectableNft
export function setSelectableNftDisabledPropFromOwner(
  owner: User,
  nft?: SelectableNft
): ((nft: SelectableNft) => SelectableNft) | SelectableNft {
  if (isNil(nft)) {
    return internalFn(owner)
  }
  return internalFn(owner)(nft)
}

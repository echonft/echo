import { isDisabled } from '@echo/ui/helpers/disableable/is-disabled'
import { isSelected } from '@echo/ui/helpers/selection/is-selected'
import { toggleSelection } from '@echo/ui/helpers/selection/toggle-selection'
import { DisableableType } from '@echo/ui/types/disableable'
import { SelectableType } from '@echo/ui/types/selectable'

export function removeSelectionWhenDisabled<T>(obj: DisableableType<SelectableType<T>>) {
  if (isDisabled(obj) && isSelected(obj)) {
    return toggleSelection(obj) as T
  }
  return obj
}

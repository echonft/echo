import { isDisabled } from '@echo/ui/helpers/disableable/is-disabled'
import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import { toggleSelection } from '@echo/ui/helpers/selectable/toggle-selection'
import type { Disableable } from '@echo/ui/types/disableable'
import type { Selectable } from '@echo/ui/types/selectable'

export function removeSelectionWhenDisabled<T extends Disableable & Selectable>(obj: T) {
  if (isDisabled(obj) && isSelected(obj)) {
    return toggleSelection<T>(obj)
  }
  return obj
}

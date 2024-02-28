import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import { select } from '@echo/ui/helpers/selectable/select'
import { unselect } from '@echo/ui/helpers/selectable/unselect'
import { type Selectable } from '@echo/ui/types/selectable'
import { ifElse } from 'ramda'

export function toggleSelection<T>(obj: Selectable<T>): Selectable<T> {
  return ifElse(isSelected, unselect, select)(obj)
}

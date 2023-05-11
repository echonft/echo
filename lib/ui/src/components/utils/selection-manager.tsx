import { SelectableProps } from '../../types/selectable-props'
import { cloneElement, ReactElement, useState } from 'react'

export interface SelectionManagerProps<T, U extends SelectableProps<T>> {
  initialSelection?: boolean
  children: ReactElement<U>
}

export const SelectionManager = <T, U extends SelectableProps<T>>({
  initialSelection,
  children
}: SelectionManagerProps<T, U>) => {
  const [selected, setSelected] = useState(initialSelection ?? false)
  return cloneElement<U>(children, {
    ...children.props,
    selected,
    onToggleSelection: (_id: T, selected) => {
      setSelected(selected)
    }
  })
}

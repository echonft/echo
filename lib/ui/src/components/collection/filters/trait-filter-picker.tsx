import { TraitFilter, TraitFilterGroup } from '../../../model/trait-filter'
import { CollapsibleProps } from '../../../types/collapsible-props'
import { MultiSelectableProps } from '../../../types/multi-selectable-props'
import { TraitFilterButton } from './trait-filter-button'
import { TraitFilterSelector } from './trait-filter-selector'
import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface TraitFilterPickerProps extends CollapsibleProps, MultiSelectableProps<string> {
  traitFilterGroup: TraitFilterGroup
}

function isTraitSelected(trait: TraitFilter, selection: string[] | undefined): boolean {
  if (isNil(selection)) {
    return false
  }
  return selection.includes(trait.name)
}

export const TraitFilterPicker: FunctionComponent<TraitFilterPickerProps> = ({
  traitFilterGroup,
  selection,
  collapsed,
  onToggleCollapsed,
  onAddSelection,
  onRemoveSelection
}) => {
  const { type, traits } = traitFilterGroup
  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'w-full', 'h-max')}>
      <TraitFilterButton
        type={type}
        collapsed={collapsed ?? false}
        selectionCount={selection?.length ?? 0}
        onToggleCollapsed={onToggleCollapsed}
      />
      <Transition
        show={collapsed ?? false}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className={clsx('flex', 'flex-col', 'gap-2', 'w-full', 'h-max')}>
          {traits.map((trait) => (
            <TraitFilterSelector
              key={trait.name}
              value={trait.name}
              count={trait.count}
              selected={isTraitSelected(trait, selection)}
              onToggleSelection={(id, selected) => {
                if (selected) {
                  onAddSelection?.(id)
                } else {
                  onRemoveSelection?.(id)
                }
              }}
            />
          ))}
        </div>
      </Transition>
    </div>
  )
}

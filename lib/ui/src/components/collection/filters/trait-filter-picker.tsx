import { CollapsibleProps } from '../../../types/collapsible-props'
import { TraitFilterGroup } from '../../../types/model/trait-filter'
import { MultiSelectableProps } from '../../../types/multi-selectable-props'
import { TraitFilterButton } from './trait-filter-button'
import { TraitFilterSelector } from './trait-filter-selector'
import { NftTraitValue } from '../../../../../ui-model'
import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { any, eqProps, isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface TraitFilterPickerProps extends CollapsibleProps, MultiSelectableProps<NftTraitValue> {
  traitFilterGroup: TraitFilterGroup
}

function isTraitSelected(trait: NftTraitValue, selection: NftTraitValue[] | undefined): boolean {
  if (isNil(selection)) {
    return false
  }
  return any(eqProps('value', trait), selection)
}

export const TraitFilterPicker: FunctionComponent<TraitFilterPickerProps> = ({
  traitFilterGroup,
  selection,
  collapsed,
  onToggleCollapsed,
  onAddSelection,
  onRemoveSelection
}) => {
  const { trait, values } = traitFilterGroup
  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'w-full', 'h-max')}>
      <TraitFilterButton
        trait={trait}
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
          {values.map((trait) => (
            <TraitFilterSelector
              key={trait.value}
              value={trait}
              selected={isTraitSelected(trait, selection)}
              onToggleSelection={(value, selected) => {
                if (selected) {
                  onAddSelection?.(value)
                } else {
                  onRemoveSelection?.(value)
                }
              }}
            />
          ))}
        </div>
      </Transition>
    </div>
  )
}

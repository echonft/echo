'use client'
import { TraitFilterButton } from '@echo/ui/components/nft/filters/by-traits/trait-filter-button'
import { TraitFilterSelector } from '@echo/ui/components/nft/filters/by-traits/trait-filter-selector'
import type { CollapsibleProps } from '@echo/ui/types/collapsible-props'
import type { NftTraitValue } from '@echo/ui/types/model/nft-trait-value'
import type { MultiSelectableProps } from '@echo/ui/types/multi-selectable-props'
import type { TraitFilterGroup } from '@echo/ui/types/trait-filter-group'
import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { any, concat, eqProps, isNil, without } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends CollapsibleProps, MultiSelectableProps<NftTraitValue> {
  traitFilterGroup: TraitFilterGroup
}

function isTraitSelected(trait: NftTraitValue, selection: NftTraitValue[] | undefined): boolean {
  if (isNil(selection)) {
    return false
  }
  return any(eqProps('value', trait), selection)
}

export const TraitFilterPicker: FunctionComponent<Props> = ({
  traitFilterGroup,
  selection,
  collapsed,
  onToggleCollapsed,
  onSelectionUpdate
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
          {values.map((traitValue) => (
            <TraitFilterSelector
              key={`${trait}-${traitValue.value}`}
              value={traitValue}
              selected={isTraitSelected(traitValue, selection)}
              onToggleSelection={(value, selected) => {
                if (selected) {
                  onSelectionUpdate?.(concat([value], selection))
                } else {
                  onSelectionUpdate?.(without([value], selection))
                }
              }}
            />
          ))}
        </div>
      </Transition>
    </div>
  )
}

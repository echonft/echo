'use client'
import { TraitFilterButton } from '@echo/ui/components/nft/filters/by-traits/trait-filter-button'
import { TraitFilterSelector } from '@echo/ui/components/nft/filters/by-traits/trait-filter-selector'
import { type CollapsibleProps } from '@echo/ui/types/collapsible-props'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends CollapsibleProps {
  trait: string
  filters: TraitFilter[]
  selectionCount: number
  onToggleSelection?: (filter: TraitFilter) => unknown
}

export const TraitFilterPicker: FunctionComponent<Props> = ({
  trait,
  filters,
  selectionCount,
  collapsed,
  onToggleCollapsed,
  onToggleSelection
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'w-full', 'h-max')}>
      <TraitFilterButton
        trait={trait}
        collapsed={collapsed ?? false}
        selectionCount={selectionCount}
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
          {filters.map((filter) => (
            <TraitFilterSelector
              key={`${trait}-${filter.value}`}
              filter={filter}
              onToggleSelection={onToggleSelection}
            />
          ))}
        </div>
      </Transition>
    </div>
  )
}

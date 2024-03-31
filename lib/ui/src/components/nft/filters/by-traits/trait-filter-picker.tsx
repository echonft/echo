'use client'
import { TraitFilterButton } from '@echo/ui/components/nft/filters/by-traits/trait-filter-button'
import { NftFilter } from '@echo/ui/components/nft/filters/nft-filter'
import { type WithCollapsibleProps } from '@echo/ui/types/props/with-collapsible-props'
import type { Selectable } from '@echo/ui/types/selectable'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithCollapsibleProps {
  label: string
  filters: Selectable<TraitFilter>[]
  onToggleSelection?: (filter: Selectable<TraitFilter>) => unknown
}

export const TraitFilterPicker: FunctionComponent<Props> = ({
  label,
  filters,
  collapsed,
  onToggleCollapsed,
  onToggleSelection
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'w-full', 'h-max')}>
      <TraitFilterButton trait={label} collapsed={collapsed ?? false} onToggleCollapsed={onToggleCollapsed} />
      <Transition
        show={collapsed ?? false}
        enter="transition duration-150 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-150 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className={clsx('flex', 'flex-col', 'gap-2', 'w-full', 'h-max')}>
          {filters.map((filter) => (
            <NftFilter key={filter.id} filter={filter} onToggleSelection={onToggleSelection} />
          ))}
        </div>
      </Transition>
    </div>
  )
}

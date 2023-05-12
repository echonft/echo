import { TraitFilterGroup } from '../../../model/trait-filter'
import { SearchIconSvg } from '../../base/svg/search-icon-svg'
import { FiltersPanel } from './filters-panel'
import { TraitFilterPickerManager } from './trait-filter-picker-manager'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { ChangeEvent, FunctionComponent } from 'react'

export interface TraitFilterPanelProps {
  traitFilterGroups: TraitFilterGroup[]
  collapsedStates: Map<string, boolean>
  selections: Map<string, string[]>
  onSearchQueryChange?: (searchQuery: string) => unknown
  onSelectionUpdate?: (type: string, selection: string[]) => unknown
}

export const TraitFilterPanel: FunctionComponent<TraitFilterPanelProps> = ({
  collapsedStates,
  selections,
  traitFilterGroups,
  onSearchQueryChange,
  onSelectionUpdate
}) => {
  const t = useTranslations('collection.filters.traits')
  return (
    <FiltersPanel>
      <h2 className={clsx('prose-label-sm-bold', 'text-white/50', 'py-1')}>{t('title')}</h2>
      <Combobox
        className={clsx('relative', 'w-full', 'h-max', 'flex', 'flex-row', 'items-center')}
        as={'div'}
        defaultValue={''}
      >
        <SearchIconSvg
          className={clsx('absolute', 'top-[0.4375rem]', 'left-3', 'z-10', 'text-yellow-500')}
          width={16}
          height={16}
        />
        <Combobox.Input
          className={clsx(
            'bg-white/[0.08]',
            'rounded-lg',
            'pl-10',
            'pr-4',
            'py-2',
            'h-max',
            'w-full',
            'prose-label-xs-bold',
            'focus-visible:outline-0',
            'focus-visible:bg-white/50',
            'focus-visible:text-dark-300',
            'focus-visible:placeholder:text-dark-300'
          )}
          onChange={(event: ChangeEvent<HTMLInputElement> & { target: { value: string } }) => {
            onSearchQueryChange?.(event.target.value)
          }}
        />
      </Combobox>
      {traitFilterGroups.map((traitFilterGroup) => (
        <TraitFilterPickerManager
          key={traitFilterGroup.type}
          traitFilterGroup={traitFilterGroup}
          initialSelection={selections?.get(traitFilterGroup.type)}
          initialCollapsedState={collapsedStates?.get(traitFilterGroup.type)}
          onSelectionUpdate={(selection) => {
            onSelectionUpdate?.(traitFilterGroup.type, selection)
          }}
        />
      ))}
    </FiltersPanel>
  )
}

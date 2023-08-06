import { mapNftTraits } from '../../../model/mapper/map-nft-traits'
import { FiltersPanel } from './filters-panel'
import { TraitFilterPickerManager } from './trait-filter-picker-manager'
import { NftTraits, NftTraitValue } from '@echo/model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface TraitFilterPanelProps {
  traits: NftTraits
  initialSelection?: NftTraits
  onSearchQueryChange?: (searchQuery: string) => unknown
  onSelectionUpdate?: (trait: string, selection: NftTraitValue[]) => unknown
}

export const TraitFilterPanel: FunctionComponent<TraitFilterPanelProps> = ({
  initialSelection,
  traits,
  onSelectionUpdate
}) => {
  const t = useTranslations('collection.filters.traits')
  const traitFilterGroups = mapNftTraits(traits)
  return (
    <FiltersPanel>
      <h2 className={clsx('prose-label-sm-semi', 'text-white/50', 'py-1')}>{t('title')}</h2>
      {/*<Combobox*/}
      {/*  className={clsx('relative', 'w-full', 'h-max', 'flex', 'flex-row', 'items-center')}*/}
      {/*  as={'div'}*/}
      {/*  defaultValue={''}*/}
      {/*>*/}
      {/*  <SearchIconSvg*/}
      {/*    className={clsx('absolute', 'top-[0.4375rem]', 'left-3', 'z-10', 'text-yellow-500')}*/}
      {/*    width={16}*/}
      {/*    height={16}*/}
      {/*  />*/}
      {/*  <Combobox.Input*/}
      {/*    className={clsx(*/}
      {/*      'bg-white/[0.08]',*/}
      {/*      'rounded-lg',*/}
      {/*      'pl-10',*/}
      {/*      'pr-4',*/}
      {/*      'py-2',*/}
      {/*      'h-max',*/}
      {/*      'w-full',*/}
      {/*      'prose-label-xs-semi',*/}
      {/*      'focus-visible:outline-0',*/}
      {/*      'focus-visible:bg-white/50',*/}
      {/*      'focus-visible:text-dark-300',*/}
      {/*      'focus-visible:placeholder:text-dark-300'*/}
      {/*    )}*/}
      {/*    onChange={(event: ChangeEvent<HTMLInputElement> & { target: { value: string } }) => {*/}
      {/*      onSearchQueryChange?.(event.target.value)*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Combobox>*/}
      {traitFilterGroups.map((traitFilterGroup) => (
        <TraitFilterPickerManager
          key={traitFilterGroup.trait}
          traitFilterGroup={traitFilterGroup}
          initialSelection={initialSelection?.[traitFilterGroup.trait]}
          onSelectionUpdate={(selection) => {
            onSelectionUpdate?.(traitFilterGroup.trait, selection)
          }}
        />
      ))}
    </FiltersPanel>
  )
}

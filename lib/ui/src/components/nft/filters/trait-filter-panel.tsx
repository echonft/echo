'use client'
import { FiltersPanel } from '../../layout/filters-panel'
import { TraitFilterPickerManager } from './trait-filter-picker-manager'
import { groupNftTraits, NftTraits, NftTraitValue } from '@echo/ui-model'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  traits: NftTraits
  initialSelection?: NftTraits
  onSelectionUpdate?: (trait: string, selection: NftTraitValue[]) => unknown
}

export const TraitFilterPanel: FunctionComponent<Props> = ({ initialSelection, traits, onSelectionUpdate }) => {
  const t = useTranslations('collection.filters.traits')
  const traitFilterGroups = groupNftTraits(traits)
  return (
    <FiltersPanel title={t('title')}>
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

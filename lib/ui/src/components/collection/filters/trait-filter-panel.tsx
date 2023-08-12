import { mapNftTraits } from '../../../model/mappers/map-nft-traits'
import { FiltersPanel } from '../../layout/filters-panel'
import { TraitFilterPickerManager } from './trait-filter-picker-manager'
import { NftTraits, NftTraitValue } from '../../../../../ui-model'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface TraitFilterPanelProps {
  traits: NftTraits
  selection?: NftTraits
  onSelectionUpdate?: (trait: string, selection: NftTraitValue[]) => unknown
}

export const TraitFilterPanel: FunctionComponent<TraitFilterPanelProps> = ({
  selection,
  traits,
  onSelectionUpdate
}) => {
  const t = useTranslations('collection.filters.traits')
  const traitFilterGroups = mapNftTraits(traits)
  return (
    <FiltersPanel title={t('title')}>
      {traitFilterGroups.map((traitFilterGroup) => (
        <TraitFilterPickerManager
          key={traitFilterGroup.trait}
          traitFilterGroup={traitFilterGroup}
          initialSelection={selection?.[traitFilterGroup.trait]}
          onSelectionUpdate={(selection) => {
            onSelectionUpdate?.(traitFilterGroup.trait, selection)
          }}
        />
      ))}
    </FiltersPanel>
  )
}

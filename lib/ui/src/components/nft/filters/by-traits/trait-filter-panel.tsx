'use client'
import { groupNftTraits } from '../../../../helpers/nft/group-nft-traits'
import { FiltersPanel } from '../../../layout/filters-panel'
import { TraitFilterPickerManager } from './trait-filter-picker-manager'
import { getTraitsForNfts, Nft, NftTraits } from '@echo/ui-model'
import { useTranslations } from 'next-intl'
import { assoc, dissoc, isEmpty } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  nfts: Array<Nft>
  selection: NftTraits
  onSelectionUpdate?: (selection: NftTraits) => unknown
}

export const TraitFilterPanel: FunctionComponent<Props> = ({ nfts, selection, onSelectionUpdate }) => {
  const t = useTranslations('collection.filters.traits')
  const traits = useMemo(() => getTraitsForNfts(nfts), [nfts])
  const traitFilterGroups = useMemo(() => groupNftTraits(traits), [traits])
  return (
    <FiltersPanel title={t('title')}>
      {traitFilterGroups.map((traitFilterGroup) => (
        <TraitFilterPickerManager
          key={traitFilterGroup.trait}
          traitFilterGroup={traitFilterGroup}
          onSelectionUpdate={(traitSelection) => {
            const newSelection = isEmpty(traitSelection)
              ? dissoc(traitFilterGroup.trait, selection)
              : assoc(traitFilterGroup.trait, traitSelection, selection)
            onSelectionUpdate?.(newSelection)
          }}
        />
      ))}
    </FiltersPanel>
  )
}

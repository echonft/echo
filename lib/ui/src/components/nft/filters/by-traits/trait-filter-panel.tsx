'use client'
import { FiltersPanel } from '@echo/ui/components/layout/filters-panel'
import { TraitFilterPickerManager } from '@echo/ui/components/nft/filters/by-traits/trait-filter-picker-manager'
import { getTraitsForNfts } from '@echo/ui/helpers/nft/get-traits-for-nfts'
import { groupNftTraits } from '@echo/ui/helpers/nft/group-nft-traits'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NftTraits } from '@echo/ui/types/model/nft-traits'
import { useTranslations } from 'next-intl'
import { assoc, dissoc, isEmpty } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

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

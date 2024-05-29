'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group/group-nfts-by-collection'
import { sortGroupNftsBySelection } from '@echo/ui/helpers/nft/sort/sort-group-nfts-by-selection'
import type { Selectable } from '@echo/ui/types/selectable'

interface Props<T extends Nft> {
  nfts: T[]
  selection: Selectable<Nft>[]
  onSelect?: (nft: Selectable<Nft>) => unknown
  onUnselect?: (nft: Selectable<Nft>) => unknown
}

export const CreateOfferSenderNftsSelection = <T extends Nft>({ nfts, selection, onSelect, onUnselect }: Props<T>) => {
  return (
    <SelectableNfts
      nfts={nfts}
      groupBy={groupNftsByCollection}
      sortBy={sortGroupNftsBySelection}
      selection={selection}
      options={{ owner: { hide: true } }}
      style={{ collapsible: true, selectionContainer: { minWitdh: true } }}
      onSelect={onSelect}
      onUnselect={onUnselect}
    />
  )
}

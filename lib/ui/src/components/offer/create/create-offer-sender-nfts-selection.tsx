'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group/group-nfts-by-collection'
import { sortGroupNftsBySelection } from '@echo/ui/helpers/nft/sort/sort-group-nfts-by-selection'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  selection: Nft[]
  onSelect?: (nft: Nft) => unknown
  onUnselect?: (nft: Nft) => unknown
}

export const CreateOfferSenderNftsSelection: FunctionComponent<Props> = ({ nfts, selection, onSelect, onUnselect }) => {
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

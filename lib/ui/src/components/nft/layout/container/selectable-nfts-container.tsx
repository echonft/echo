'use client'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SelectableNftCard } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: SelectableNft[]
  onToggleSelection?: (nft: SelectableNft) => unknown
  onAction?: (nft: SelectableNft) => unknown
}

export const SelectableNftsContainer: FunctionComponent<Props> = ({ nfts, onToggleSelection, onAction }) => {
  return (
    <NftsLayout>
      {map(
        (nft) => (
          <SelectableNftCard key={nft.id} nft={nft} onToggleSelection={onToggleSelection} onAction={onAction} />
        ),
        nfts
      )}
    </NftsLayout>
  )
}

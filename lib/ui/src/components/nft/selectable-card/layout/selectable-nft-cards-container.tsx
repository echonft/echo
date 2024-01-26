'use client'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { SelectableNftCard } from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: SelectableNft[]
  hideOwner?: boolean
  hideLink?: boolean
  onToggleSelection?: (nft: SelectableNft) => unknown
  onAction?: (nft: SelectableNft) => unknown
}

export const SelectableNftCardsContainer: FunctionComponent<Props> = ({
  nfts,
  hideLink,
  hideOwner,
  onToggleSelection,
  onAction
}) => {
  return (
    <CardsLayout>
      {map(
        (nft) => (
          <SelectableNftCard
            key={nft.id}
            nft={nft}
            onToggleSelection={onToggleSelection}
            onAction={onAction}
            hideLink={hideLink}
            hideOwner={hideOwner}
          />
        ),
        nfts
      )}
    </CardsLayout>
  )
}

'use client'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import {
  SelectableNftCard,
  type SelectableNftCardProps
} from '@echo/ui/components/nft/selectable-card/selectable-nft-card'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Omit<SelectableNftCardProps, 'nft'> {
  nfts: SelectableNft[]
}

export const SelectableNftCards: FunctionComponent<Props> = ({ nfts, options, onToggleSelection, onAction }) => {
  return (
    <CardsLayout>
      {map(
        (nft) => (
          <SelectableNftCard
            key={nft.id}
            nft={nft}
            options={options}
            onToggleSelection={onToggleSelection}
            onAction={onAction}
          />
        ),
        nfts
      )}
    </CardsLayout>
  )
}

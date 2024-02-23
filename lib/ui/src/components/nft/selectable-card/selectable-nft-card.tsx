'use client'
import { SelectableNftCardButtonLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-button-layout'
import { SelectableNftCardLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-layout'
import { SelectableNftCardButton } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-button'
import { SelectableNftCardFooter } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-footer'
import { SelectableNftCardPicture } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type FunctionComponent } from 'react'

export interface SelectableNftCardProps {
  nft: SelectableNft
  options?: {
    owner?: {
      hide?: boolean
    }
  }
  onToggleSelection?: (nft: SelectableNft) => unknown
  onAction?: (nft: SelectableNft) => unknown
}

export const SelectableNftCard: FunctionComponent<SelectableNftCardProps> = ({
  nft,
  options,
  onToggleSelection,
  onAction
}) => {
  return (
    <SelectableNftCardLayout
      nft={nft}
      onClick={() => {
        onToggleSelection?.(nft)
      }}
    >
      <SelectableNftCardPicture nft={nft} options={options} />
      <SelectableNftCardFooter nft={nft} />
      <SelectableNftCardButtonLayout>
        <SelectableNftCardButton
          nft={nft}
          onClick={() => {
            onAction?.(nft)
          }}
        />
      </SelectableNftCardButtonLayout>
    </SelectableNftCardLayout>
  )
}

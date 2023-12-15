'use client'
import { NftCardLayout } from '@echo/ui/components/nft/card/layout/nft-card-layout'
import { SelectableNftCardButtonLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-button-layout'
import { SelectableNftCardButton } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-button'
import { SelectableNftCardPicture } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture'
import { SelectableNftCardTitle } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-title'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface SelectableNftCardProps {
  nft: SelectableNft
  hideOwner?: boolean
  onToggleSelection?: (nft: SelectableNft, selected: boolean) => unknown
  onAction?: (nft: SelectableNft) => unknown
}

export const SelectableNftCard: FunctionComponent<SelectableNftCardProps> = ({
  nft,
  hideOwner,
  onToggleSelection,
  onAction
}) => {
  return (
    <NftCardLayout className={clsx('group', nft.selected && 'border-yellow-500')} disabled={nft.disabled}>
      <SelectableNftCardPicture nft={nft} hideOwner={hideOwner} onToggleSelection={onToggleSelection} />
      <SelectableNftCardTitle nft={nft} />
      <SelectableNftCardButtonLayout>
        <SelectableNftCardButton
          nft={nft}
          onClick={() => {
            onAction?.(nft)
          }}
        />
      </SelectableNftCardButtonLayout>
    </NftCardLayout>
  )
}

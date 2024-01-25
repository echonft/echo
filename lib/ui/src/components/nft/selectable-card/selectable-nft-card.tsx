'use client'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { SelectableNftCardButtonLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-button-layout'
import { SelectableNftCardButton } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-button'
import { SelectableNftCardFooter } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-footer'
import { SelectableNftCardPicture } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture'
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
    <CardLayout className={clsx(nft.selected && '!border-yellow-500')} disabled={nft.disabled}>
      <SelectableNftCardPicture nft={nft} hideOwner={hideOwner} onToggleSelection={onToggleSelection} />
      <SelectableNftCardFooter nft={nft} />
      <SelectableNftCardButtonLayout>
        <SelectableNftCardButton
          nft={nft}
          onClick={() => {
            onAction?.(nft)
          }}
        />
      </SelectableNftCardButtonLayout>
    </CardLayout>
  )
}

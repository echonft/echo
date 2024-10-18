'use client'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { SelectableNftCardButtonLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-button-layout'
import { SelectableNftCardLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-layout'
import { SelectableNftCardButton } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-button'
import { SelectableNftCardFooter } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-footer'
import { SelectableNftCardPicture } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture'
import type { NftAction } from '@echo/ui/constants/nft-actions'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent } from 'react'

export interface SelectableNftCardProps {
  nft: OwnedNft
  options?: {
    owner?: {
      hide?: boolean
    }
  }
  action?: Nullable<NftAction>
  onSelect?: (nft: OwnedNft) => unknown
  onAction?: (nft: OwnedNft) => unknown
}

export const SelectableNftCard: FunctionComponent<SelectableNftCardProps> = ({
  nft,
  action,
  options,
  onSelect,
  onAction
}) => {
  return (
    <SelectableNftCardLayout
      onClick={() => {
        onSelect?.(nft)
      }}
    >
      <SelectableNftCardPicture nft={nft} options={options} />
      <SelectableNftCardFooter nft={nft} action={action} />
      <SelectableNftCardButtonLayout>
        <SelectableNftCardButton
          action={action}
          onClick={(event) => {
            event.stopPropagation()
            onAction?.(nft)
          }}
        />
      </SelectableNftCardButtonLayout>
    </SelectableNftCardLayout>
  )
}

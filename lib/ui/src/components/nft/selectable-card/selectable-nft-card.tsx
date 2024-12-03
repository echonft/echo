'use client'
import type { OwnedNft } from '@echo/model/types/nft'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { SelectableNftCardButtonLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-button-layout'
import { SelectableNftCardButton } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-button'
import { SelectableNftCardFooter } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-footer'
import { SelectableNftCardPicture } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-picture'
import { Color } from '@echo/ui/constants/color'
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
  disabled?: boolean
  selected?: boolean
  onSelect?: (nft: OwnedNft) => unknown
  onUnselect?: (nft: OwnedNft) => unknown
  onAction?: (nft: OwnedNft) => unknown
}

const Button: FunctionComponent<Pick<SelectableNftCardProps, 'nft' | 'action' | 'disabled' | 'onAction'>> = ({
  nft,
  action,
  disabled,
  onAction
}) => {
  if (disabled) {
    return null
  }
  return (
    <SelectableNftCardButton
      action={action}
      onClick={(event) => {
        event.stopPropagation()
        onAction?.(nft)
      }}
    />
  )
}

export const SelectableNftCard: FunctionComponent<SelectableNftCardProps> = ({
  nft,
  action,
  disabled,
  options,
  selected,
  onSelect,
  onUnselect,
  onAction
}) => {
  return (
    <CardLayout
      disabled={disabled}
      options={selected ? { borderColor: Color.Yellow } : undefined}
      onClick={disabled ? undefined : () => (selected ? onUnselect?.(nft) : onSelect?.(nft))}
    >
      <SelectableNftCardPicture nft={nft} options={options} />
      <SelectableNftCardFooter nft={nft} action={action} disabled={disabled} />
      <SelectableNftCardButtonLayout>
        <Button nft={nft} disabled={disabled} action={action} onAction={onAction} />
      </SelectableNftCardButtonLayout>
    </CardLayout>
  )
}

'use client'
import { CardLayout, type CardLayoutProps } from '@echo/ui/components/base/card/layout/card-layout'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props extends Omit<CardLayoutProps, 'className'> {
  nft: SelectableNft
  onClick?: MouseEventHandler
}

export const SelectableNftCardLayout: FunctionComponent<Props> = ({ nft, onClick, ...rest }) => {
  const { selected, disabled, selectionDisabled } = nft
  const isSelectable = !disabled && !selectionDisabled
  return (
    <div
      className={clsx('w-max', 'h-max', 'transition-all', 'ease-in-out', isSelectable && 'cursor-pointer')}
      onClick={isSelectable ? onClick : undefined}
    >
      <CardLayout className={clsx(selected && 'border-yellow-500')} disabled={disabled} {...rest} />
    </div>
  )
}

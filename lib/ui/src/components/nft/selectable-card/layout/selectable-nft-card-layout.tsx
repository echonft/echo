'use client'
import { CardLayout, type CardLayoutProps } from '@echo/ui/components/base/card/layout/card-layout'
import { classes } from '@echo/ui/helpers/classes'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
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
      className={classes('w-max', 'h-max', 'transition-all', 'ease-in-out', isSelectable && 'cursor-pointer')}
      onClick={isSelectable ? onClick : undefined}
    >
      <CardLayout className={classes(selected && 'border-yellow-500')} disabled={disabled} {...rest} />
    </div>
  )
}

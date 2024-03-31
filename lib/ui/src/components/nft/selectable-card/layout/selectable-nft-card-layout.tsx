'use client'
import { CardLayout, type CardLayoutProps } from '@echo/ui/components/base/card/layout/card-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props extends CardLayoutProps {
  onClick?: MouseEventHandler
}

export const SelectableNftCardLayout: FunctionComponent<Props> = ({ onClick, ...rest }) => {
  return (
    <div className={clsx('w-max', 'h-max', 'transition-all', 'ease-in-out', 'cursor-pointer')} onClick={onClick}>
      <CardLayout {...rest} />
    </div>
  )
}

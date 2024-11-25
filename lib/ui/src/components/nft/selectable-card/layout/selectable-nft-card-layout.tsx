'use client'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { Color } from '@echo/ui/constants/color'
import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler, type PropsWithChildren } from 'react'

interface Props {
  selected?: boolean
  onClick?: MouseEventHandler
}

export const SelectableNftCardLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  selected,
  onClick,
  children
}) => {
  const options = selected ? { borderColor: Color.Yellow as const } : undefined
  return (
    <div className={clsx('w-max', 'h-max', 'transition-all', 'ease-in-out', 'cursor-pointer')} onClick={onClick}>
      <CardLayout options={options}>{children}</CardLayout>
    </div>
  )
}

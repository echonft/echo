'use client'
import { Color } from '@echo/ui/constants/color'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

export interface CardLayoutProps {
  disabled?: boolean
  options?: {
    borderColor?: Color.Yellow
  }
  onClick?: MouseEventHandler
}

export const CardLayout: FunctionComponent<PropsWithChildren<CardLayoutProps>> = ({
  disabled,
  options,
  onClick,
  children
}) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'w-[12.625rem]',
        'card-height',
        'overflow-clip',
        'border',
        'border-solid',
        options?.borderColor === Color.Yellow ? 'border-yellow-500' : 'border-white/10',
        'bg-dark-500',
        'group',
        'transition ease-in-out',
        'outline-none',
        !disabled && !isNil(onClick) && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

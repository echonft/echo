'use client'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler } from 'react'

export interface CardLayoutProps extends WithChildrenProps, WithLoadingProps, WithClassNameProps {
  onClick?: MouseEventHandler
}

export const CardLayout: FunctionComponent<CardLayoutProps> = ({ loading, className, children, onClick }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'w-[12.625rem]',
        'h-max',
        'overflow-clip',
        'border',
        'border-solid',
        'border-white/10',
        'bg-dark-500',
        'group',
        'transition ease-in-out',
        loading ? 'animate-pulse' : !isNil(onClick) && 'cursor-pointer',
        className
      )}
      onClick={loading ? undefined : onClick}
    >
      {children}
    </div>
  )
}

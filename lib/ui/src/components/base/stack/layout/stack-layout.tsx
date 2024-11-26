'use client'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const StackLayout: FunctionComponent<PropsWithChildren<Props>> = ({ children, onClick }) => {
  return (
    <div className={clsx('relative')}>
      <div
        className={clsx(
          'rounded-2xl',
          'w-[12.625rem]',
          'card-height',
          'overflow-clip',
          'border',
          'border-solid',
          'border-white/10',
          'bg-dark-500',
          'group',
          'transition ease-in-out',
          'outline-none',
          !isNil(onClick) && 'cursor-pointer'
        )}
        onClick={onClick}
      >
        {children}
      </div>
      <div
        className={clsx(
          'absolute',
          'w-[12.625rem]',
          'card-height',
          'rounded-2xl',
          'top-1',
          'left-2',
          'rotate-[2deg]',
          '-z-10',
          'border-white/10',
          'border',
          'bg-dark-250'
        )}
      />
    </div>
  )
}

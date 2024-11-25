'use client'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent, MouseEventHandler, PropsWithChildren } from 'react'

interface Props {
  onClick?: MouseEventHandler
}

export const StackLayout: FunctionComponent<PropsWithChildren<Props>> = ({ children, onClick }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'w-[13.5rem]',
        'card-height',
        'overflow-clip',
        'bg-stack',
        // 'bg-[length:208px_310px]',
        'bg-no-repeat',
        // 'bg-origin-border',
        'group',
        'transition ease-in-out',
        'outline-none',
        !isNil(onClick) && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      <div className={clsx('translate-x-0.5', 'translate-y-[1px]')}>{children}</div>
    </div>
  )
}

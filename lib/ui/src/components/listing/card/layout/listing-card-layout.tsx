import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps, WithClassNameProps {
  onClick?: MouseEventHandler
}

export const ListingCardLayout: FunctionComponent<Props> = ({ onClick, loading, className, children }) => {
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
        loading ? 'animate-pulse' : 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

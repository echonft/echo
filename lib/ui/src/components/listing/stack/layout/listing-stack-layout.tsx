import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps, WithClassNameProps {
  onClick?: MouseEventHandler
}

export const ListingStackLayout: FunctionComponent<Props> = ({ loading, className, onClick, children }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'w-[13.5rem]',
        'h-[17.5rem]',
        'overflow-clip',
        'bg-stack',
        'bg-[length:216px_289px]',
        'bg-origin-border',
        'border-transparent',
        'border',
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

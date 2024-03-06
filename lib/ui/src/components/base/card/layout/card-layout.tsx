import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export interface CardLayoutProps extends WithChildrenProps, WithLoadingProps, WithClassNameProps {
  disabled?: boolean
}
export const CardLayout: FunctionComponent<CardLayoutProps> = ({ disabled, loading, className, children }) => {
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
        loading && 'animate-pulse',
        disabled && 'opacity-40',
        className
      )}
    >
      {children}
    </div>
  )
}

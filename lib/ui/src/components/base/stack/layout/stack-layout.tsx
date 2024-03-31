import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps, WithClassNameProps {}

export const StackLayout: FunctionComponent<Props> = ({ loading, className, children }) => {
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
        'transition ease-in-out',
        loading && 'animate-pulse',
        className
      )}
    >
      {children}
    </div>
  )
}

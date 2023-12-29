import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {}

export const ItemCardLayout: FunctionComponent<Props> = ({ loading, children }) => {
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
        loading && 'animate-pulse'
      )}
    >
      {children}
    </div>
  )
}

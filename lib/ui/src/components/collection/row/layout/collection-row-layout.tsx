import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CollectionRowLayout: FunctionComponent<PropsWithChildren<WithLoadingProps>> = ({ loading, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'grow',
        'justify-between',
        'items-center',
        'p-5',
        'rounded',
        'w-full',
        loading
          ? ['animate-pulse', 'bg-white/[0.08]', 'h-[8.75rem]']
          : ['hover:bg-white/[0.08]', 'bg-transparent', 'h-max']
      )}
    >
      {children}
    </div>
  )
}

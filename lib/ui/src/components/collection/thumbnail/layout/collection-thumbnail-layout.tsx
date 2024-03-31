import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionThumbnailLayout: FunctionComponent<PropsWithChildren<WithLoadingProps>> = ({
  loading,
  children
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'pt-3.5',
        'pb-3.75',
        'px-3.25',
        'gap-3.5',
        'items-center',
        'w-96',
        'rounded-lg',
        'border',
        'border-white/10',
        'bg-dark-500',
        'relative',
        loading ? ['h-[8.125rem]', 'animate-pulse'] : 'h-max'
      )}
    >
      {children}
    </div>
  )
}

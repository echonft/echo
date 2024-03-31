import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const NftThumbnailLayout: FunctionComponent<PropsWithChildren<WithLoadingProps>> = ({ loading, children }) => {
  return (
    <div
      className={clsx(
        'rounded-lg',
        'w-32',
        'h-max',
        'overflow-clip',
        'border',
        'border-solid',
        'border-white/10',
        'bg-dark-500',
        loading && 'animate-pulse'
      )}
    >
      {children}
    </div>
  )
}

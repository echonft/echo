import { classes } from '@echo/ui/helpers/classes'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import type { FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {
  disabled?: boolean
}

export const NftThumbnailLayout: FunctionComponent<Props> = ({ disabled, loading, children }) => {
  return (
    <div
      className={classes(
        'rounded-lg',
        'w-32',
        'h-max',
        'overflow-clip',
        'border',
        'border-solid',
        'border-white/10',
        'bg-dark-500',
        disabled && 'opacity-40',
        loading && 'animate-pulse'
      )}
    >
      {children}
    </div>
  )
}

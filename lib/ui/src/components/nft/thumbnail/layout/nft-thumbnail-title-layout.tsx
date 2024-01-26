import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {}

export const NftThumbnailTitleLayout: FunctionComponent<Props> = ({ loading, children }) => {
  return (
    <div
      className={clsx(
        'w-full',
        'min-w-0',
        'h-max',
        'rounded-b-lg',
        'px-1.5',
        'pt-1.25',
        'pb-2.25',
        loading && 'invisible'
      )}
    >
      {children}
    </div>
  )
}

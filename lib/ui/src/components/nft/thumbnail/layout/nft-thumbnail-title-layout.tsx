import { classes } from '@echo/ui/helpers/classes'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {}

export const NftThumbnailTitleLayout: FunctionComponent<Props> = ({ loading, children }) => {
  return (
    <div
      className={classes(
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

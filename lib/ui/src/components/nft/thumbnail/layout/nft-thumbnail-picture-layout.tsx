import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {}

export const NftThumbnailPictureLayout: FunctionComponent<Props> = ({ loading, children }) => {
  return (
    <div className={clsx('rounded-lg', 'select-none', 'w-32', 'h-32', 'relative', loading && 'invisible')}>
      {children}
    </div>
  )
}

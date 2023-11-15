import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {}

export const NftCardPictureLayout: FunctionComponent<Props> = ({ loading, children }) => {
  return (
    <div className={clsx('rounded-2xl', 'select-none', 'w-52', 'h-52', 'relative', loading && 'invisible')}>
      {children}
    </div>
  )
}

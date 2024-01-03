import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {}

export const RemovableItemCardTitleLayout: FunctionComponent<Props> = ({ loading, children }) => {
  return (
    <div
      className={clsx('w-full', 'min-w-0', 'h-max', 'px-2.75', 'rounded-b-2xl', 'pt-3', 'pb-1', loading && 'invisible')}
    >
      {children}
    </div>
  )
}

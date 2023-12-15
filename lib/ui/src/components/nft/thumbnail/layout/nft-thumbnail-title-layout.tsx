import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps {}

export const NftThumbnailTitleLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className={clsx('w-full', 'min-w-0', 'h-max', 'rounded-b-lg', 'px-1.5', 'pt-1.25', 'pb-2.25')}>{children}</div>
  )
}

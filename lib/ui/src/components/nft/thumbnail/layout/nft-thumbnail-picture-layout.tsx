import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps {}

export const NftThumbnailPictureLayout: FunctionComponent<Props> = ({ children }) => {
  return <div className={clsx('rounded-lg', 'select-none', 'w-32', 'h-32', 'relative')}>{children}</div>
}

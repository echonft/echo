import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends WithChildrenProps {}

export const NftThumbnailLayout: FunctionComponent<Props> = ({ children }) => {
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
        'bg-dark-500'
      )}
    >
      {children}
    </div>
  )
}

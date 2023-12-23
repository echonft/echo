import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {}

export const NftCardPictureLayout: FunctionComponent<Props> = ({ loading, children }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl',
        'select-none',
        'w-[12.5rem]',
        'h-[12.5rem]',
        'relative',
        'overflow-hidden',
        loading && 'invisible'
      )}
    >
      {children}
    </div>
  )
}

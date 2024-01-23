import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithLoadingProps } from '@echo/ui/types/props/with-loading-props'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithLoadingProps {}

export const StackFooterLayout: FunctionComponent<Props> = ({ loading, children }) => {
  return (
    <div
      className={clsx(
        'w-[13.5rem]',
        'min-w-0',
        'h-max',
        'rounded-b-2xl',
        'px-2.75',
        'pt-5',
        'pb-6',
        loading && 'invisible'
      )}
    >
      {children}
    </div>
  )
}

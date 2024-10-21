import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends WithChildrenProps, WithClassNameProps {}

export const TradeCardLayout: FunctionComponent<Props> = ({ children, className }) => {
  return (
    <div className={clsx('rounded-2xl', 'w-[5.5rem]', 'h-[5.5rem]', 'bg-dark-250', 'overflow-clip', className)}>
      {children}
    </div>
  )
}

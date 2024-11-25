import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeCardLayout: FunctionComponent<PropsWithChildren<WithClassNameProps>> = ({ children, className }) => {
  return (
    <div className={clsx('rounded-2xl', 'w-[5.5rem]', 'h-[5.5rem]', 'bg-dark-250', 'overflow-clip', className)}>
      {children}
    </div>
  )
}

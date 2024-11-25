import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SelectableNftCardFooterLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('w-full', 'min-w-0', 'h-max', 'px-2.75', 'rounded-b-2xl', 'pt-1.25', 'pb-0.75')}>
      {children}
    </div>
  )
}

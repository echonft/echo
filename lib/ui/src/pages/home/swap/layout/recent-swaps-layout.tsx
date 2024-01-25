import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const RecentSwapsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'self-stretch', 'h-max', 'gap-7')}>{children}</div>
}

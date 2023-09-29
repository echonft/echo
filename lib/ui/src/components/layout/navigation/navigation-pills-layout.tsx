import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const NavigationPillsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'w-full', 'h-max', 'gap-3.5', 'pb-12')}>{children}</div>
}

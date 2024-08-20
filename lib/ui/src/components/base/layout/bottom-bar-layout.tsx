import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const BottomBarLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('bottom-bar-layout', 'h-20', 'py-4')}>{children}</div>
}

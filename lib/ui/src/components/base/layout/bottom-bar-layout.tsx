import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const BottomBarLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('bottom-bar-layout', 'h-20', 'py-4', 'justify-end', '-translate-x-6', 'lg:-translate-x-12')}>
    {children}
  </div>
)

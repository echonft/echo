import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CreateTradeBottomBarLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('bottom-bar-layout', 'h-32', 'py-5', 'justify-between')}>{children}</div>
)

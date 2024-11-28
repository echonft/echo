import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CreateTradeBottomBarButtonLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('py-5')}>{children}</div>
)

import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const ItemsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('flex', 'grow', 'flex-wrap', 'gap-6', 'h-max')}>{children}</div>
)

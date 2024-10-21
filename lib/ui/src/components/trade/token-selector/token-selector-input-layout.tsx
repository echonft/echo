import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TokenSelectorInputLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'gap-1.5', 'items-end')}>{children}</div>
}

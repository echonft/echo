import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const SwapRowLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'grow', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>{children}</div>
}

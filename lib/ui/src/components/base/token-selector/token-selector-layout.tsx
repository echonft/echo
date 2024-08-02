import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TokenSelectorLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'gap-3', 'p-5', 'bg-dark-450', 'rounded-2xl')}>{children}</div>
}

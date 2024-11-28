import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ExpirationSelectorLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'gap-2.5')}>{children}</div>
}

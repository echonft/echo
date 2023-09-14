import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const NftGroupLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'gap-4', 'h-max')}>{children}</div>
}

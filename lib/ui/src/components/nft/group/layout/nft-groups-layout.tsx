import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NftGroupsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'grow', 'gap-12', 'h-max')}>{children}</div>
}

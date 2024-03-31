import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NftFiltersPanelsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'gap-4', 'sticky', 'top-4', 'w-max', 'h-max')}>{children}</div>
}

import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TopCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'grow', 'h-max', 'gap-5')}>{children}</div>
}

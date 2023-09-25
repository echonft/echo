import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const RankedCollectionsContainerLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'gap-5', 'self-stretch')}>{children}</div>
}

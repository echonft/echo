import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const RankedCollectionsButtonContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'grow', 'h-max', 'justify-end')}>{children}</div>
}

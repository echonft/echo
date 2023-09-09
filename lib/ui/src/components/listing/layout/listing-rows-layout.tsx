import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const ListingRowsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'grow', 'gap-12')}>{children}</div>
}

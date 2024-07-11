import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ListingDetailsItemsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('pb-16')}>{children}</div>
}

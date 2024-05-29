import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ListingDetailsOffersLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('flex', 'flex-col', 'gap-4')}>{children}</div>
)

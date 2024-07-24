import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ListingDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'gap-20', 'p-4', 'w-full', 'h-max')}>{children}</div>
}

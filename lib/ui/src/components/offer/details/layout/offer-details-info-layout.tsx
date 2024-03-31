import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const OfferDetailsInfoLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>{children}</div>
}

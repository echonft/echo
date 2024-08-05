import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const OfferDetailsInfoLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'justify-center', 'items-stretch', 'gap-20')}>{children}</div>
}

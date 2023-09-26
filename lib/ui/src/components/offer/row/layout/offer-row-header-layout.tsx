import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const OfferRowHeaderLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'gap-4', 'grow')}>{children}</div>
}

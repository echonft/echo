import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const OfferRowSwapContainerLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'grow')}>{children}</div>
}

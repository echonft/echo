import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const OfferCardsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'grow', 'gap-5', 'flex-wrap')}>{children}</div>
}

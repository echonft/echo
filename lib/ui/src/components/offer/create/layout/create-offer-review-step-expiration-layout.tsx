import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CreateOfferReviewStepExpirationLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>{children}</div>
}

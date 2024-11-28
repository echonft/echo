import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CreateTradeReviewTitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <span className={clsx('prose-display-md-bold', 'text-white')}>{children}</span>
)

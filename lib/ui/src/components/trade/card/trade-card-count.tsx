import clsx from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeCardCount: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <span className={clsx('prose-label-sm-semi', 'text-white', 'pl-1', 'pr-2')}>x{children}</span>
)

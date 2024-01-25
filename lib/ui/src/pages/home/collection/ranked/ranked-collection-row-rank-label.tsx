import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const RankedCollectionRowRankLabel: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <span className={clsx('prose-header-md-semi', 'text-white', 'h-max', 'w-12', 'text-center')}>{children}</span>
}

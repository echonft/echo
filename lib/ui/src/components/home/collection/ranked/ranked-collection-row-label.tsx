import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  blur?: boolean
}
export const RankedCollectionRowLabel: FunctionComponent<PropsWithChildren<Props>> = ({ blur, children }) => {
  return <span className={clsx('prose-header-md-semi', 'text-white', 'h-max', blur && 'blur-md')}>{children}</span>
}

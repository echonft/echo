import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const PaddedLayout: FunctionComponent<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={clsx('w-full', 'relative', 'px-6', 'lg:px-12', className)}>{children}</div>
}

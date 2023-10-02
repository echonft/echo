import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const PaddedContainer: FunctionComponent<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={clsx('w-full', 'px-6', 'lg:px-12', className)}>{children}</div>
}

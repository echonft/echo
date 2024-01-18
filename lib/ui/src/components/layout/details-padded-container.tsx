import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const DetailsPaddedContainer: FunctionComponent<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={clsx('w-full', 'px-16', 'pt-24', className)}>{children}</div>
}

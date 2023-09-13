import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const PaddedContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('px-6', 'lg:px-12', 'bg-transparent')}>{children}</div>
}

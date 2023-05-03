import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const PaddedContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('px-16', 'bg-transparent')}>{children}</div>
}

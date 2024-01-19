import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const DetailsPaddedContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('w-full', 'px-16', 'pt-24')}>{children}</div>
}

import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const DetailsModalBodyLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('w-[75vw]', 'h-max', 'bg-dark-500')}>{children}</div>
}

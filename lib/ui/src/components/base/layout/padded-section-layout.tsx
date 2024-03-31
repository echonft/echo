import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const PaddedSectionLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('w-full', 'relative', 'px-16', 'pt-24')}>{children}</div>
}

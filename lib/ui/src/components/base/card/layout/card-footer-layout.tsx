import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CardFooterLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('w-full', 'min-w-0', 'h-max', 'rounded-b-2xl', 'px-2.75', 'pt-5', 'pb-6')}>{children}</div>
  )
}

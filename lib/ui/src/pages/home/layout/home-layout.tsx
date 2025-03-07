import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const HomeLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('min-h-full', 'w-full', 'pt-[4.375rem]')}>{children}</div>
}

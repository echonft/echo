import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const LoginTitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <span className={clsx('prose-display-lg-bold', 'text-white', 'text-center')}>{children}</span>
}

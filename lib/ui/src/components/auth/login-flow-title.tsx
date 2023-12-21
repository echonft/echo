import clsx from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const LoginFlowTitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <span className={clsx('text-display-lg-bold', 'text-white', 'text-center')}>{children}</span>
}

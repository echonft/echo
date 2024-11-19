import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const LoginTitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <span className={clsx('prose-header-md-semi', 'text-white', 'text-center', 'whitespace-pre-line')}>{children}</span>
  )
}

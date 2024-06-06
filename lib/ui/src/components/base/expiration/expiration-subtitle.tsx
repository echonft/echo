import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ExpirationSubtitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <span className={clsx('prose-header-sm', 'text-white')}>{children}</span>
}

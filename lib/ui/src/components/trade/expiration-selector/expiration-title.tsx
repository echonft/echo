import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ExpirationTitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <span className={clsx('prose-label-md', 'text-white')}>{children}</span>
}

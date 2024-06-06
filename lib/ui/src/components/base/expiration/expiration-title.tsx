import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ExpirationTitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <span className={clsx('prose-display-lg-bold', 'text-white', 'whitespace-pre-line')}>{children}</span>
}

import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ExpirationButtonsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'gap-5')}>{children}</div>
}

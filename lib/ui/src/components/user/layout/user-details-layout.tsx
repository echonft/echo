import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const UserDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full')}>{children}</div>
}

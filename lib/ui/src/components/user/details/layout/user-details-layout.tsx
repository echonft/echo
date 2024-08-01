import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const UserDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-5', 'self-stretch', 'items-center', 'flex-none', 'w-max', 'h-max')}>
      {children}
    </div>
  )
}

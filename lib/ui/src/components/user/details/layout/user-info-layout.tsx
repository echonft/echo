import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const UserInfoLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'self-stretch', 'justify-center', 'gap-2.5')}>{children}</div>
}

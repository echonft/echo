import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const UserProfileDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'w-full', 'justify-center', 'gap-2.5')}>{children}</div>
}

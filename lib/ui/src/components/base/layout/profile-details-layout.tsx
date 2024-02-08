import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ProfileDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'w-full', 'gap-8')}>{children}</div>
}

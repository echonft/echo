import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ProfileLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('w-full', 'h-max')}>{children}</div>
}

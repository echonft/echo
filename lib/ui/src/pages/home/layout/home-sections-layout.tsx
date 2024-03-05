import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HomeSectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'w-full', 'gap-24')}>{children}</div>
}

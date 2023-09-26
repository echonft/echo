import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const HomeCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'w-full', 'gap-14')}>{children}</div>
}

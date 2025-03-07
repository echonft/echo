import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionProfileDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'w-full', 'justify-center', 'gap-2.5')}>{children}</div>
}

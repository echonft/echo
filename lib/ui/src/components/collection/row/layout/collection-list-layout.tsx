import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CollectionListLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'gap-5', 'self-stretch', 'w-full', 'h-max')}>{children}</div>
}

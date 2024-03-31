import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionProfileSupplyAndLinksLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'w-full', 'h-max', 'justify-between')}>{children}</div>
}

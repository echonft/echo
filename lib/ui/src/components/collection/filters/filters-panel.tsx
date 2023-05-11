import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export const FiltersPanel: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'p-2', 'rounded-2xl', 'bg-white/[0.09]', 'w-52', 'h-max', 'gap-2')}>
      {children}
    </div>
  )
}

import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const RankedCollectionRowLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'grow',
        'p-5',
        'rounded',
        'group-hover:bg-white/5',
        'h-max',
        'justify-between',
        'items-center'
      )}
    >
      {children}
    </div>
  )
}

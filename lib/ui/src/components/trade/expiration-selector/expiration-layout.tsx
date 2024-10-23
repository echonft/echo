import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ExpirationLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'gap-5',
        'items-center',
        'py-2.5',
        'px-6',
        'rounded-lg',
        'bg-white/5',
        'w-max'
      )}
    >
      {children}
    </div>
  )
}

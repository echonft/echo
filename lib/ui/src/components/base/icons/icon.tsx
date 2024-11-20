import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const Icon: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'rounded',
        'text-yellow-500',
        'bg-white/[0.08]',
        'w-7.5',
        'h-7.5'
      )}
    >
      {children}
    </div>
  )
}

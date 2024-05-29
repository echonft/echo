import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const IconContainerColor: FunctionComponent<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        'flex',
        'flex-row',
        'justify-center',
        'items-center',
        'text-yellow-500',
        'bg-white/[0.08]',
        className
      )}
    >
      {children}
    </div>
  )
}

import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface IconContainerColorProps {
  className?: string
}

export const IconContainerColor: FunctionComponent<PropsWithChildren<IconContainerColorProps>> = ({
  children,
  className
}) => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        'flex',
        'flex-row',
        'justify-center',
        'items-center',
        'text-yellow-700',
        'bg-white/[0.08]',
        className
      )}
    >
      {children}
    </div>
  )
}

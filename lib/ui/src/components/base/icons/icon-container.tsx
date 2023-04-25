import { SizeLG, SizeMD, SizeSM } from '../../../types/size'
import { IconSize } from './icon-size'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface IconContainerProps {
  size: IconSize
  className?: string
}

export const IconContainer: FunctionComponent<PropsWithChildren<IconContainerProps>> = ({
  size,
  className,
  children
}) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'justify-center',
        'items-center',
        'rounded-lg',
        'text-yellow-700',
        'bg-white/[0.08]',
        size === SizeSM && ['w-6', 'h-6'],
        size === SizeMD && ['w-8', 'h-8'],
        size === SizeLG && ['w-10', 'h-10'],
        className
      )}
    >
      {children}
    </div>
  )
}

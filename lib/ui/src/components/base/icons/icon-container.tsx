import { SizeLG, SizeMD, SizeSM } from '@echo/ui/constants/size'
import type { IconSize } from '@echo/ui/types/icon-size'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  size: IconSize
  className?: string
}

export const IconContainer: FunctionComponent<PropsWithChildren<Props>> = ({ size, className, children }) => {
  return (
    <div
      className={clsx(
        ['rounded-lg', '[&>div]:rounded-lg'],
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

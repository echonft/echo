import { IconSize } from './icon-size'
import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface IconContainerProps {
  size: IconSize
}

export const IconContainer: FunctionComponent<PropsWithChildren<IconContainerProps>> = ({ size, children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'justify-center',
        'items-center',
        'rounded-lg',
        'bg-white/[0.08]',
        size === IconSize.CARD && ['w-6', 'h-6'],
        size === IconSize.MD && ['w-8', 'h-8'],
        size === IconSize.LG && ['w-10', 'h-10']
      )}
    >
      {children}
    </div>
  )
}

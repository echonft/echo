import { SIZE_LG, SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import { type IconSize } from '@echo/ui/types/icon-size'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  size: IconSize
  className?: string
}

export const Icon: FunctionComponent<PropsWithChildren<Props>> = ({ size, className, children }) => {
  return (
    <div
      className={clsx(
        'rounded-lg',
        '[&>*]:rounded-lg',
        size === SIZE_SM && ['w-6', 'h-6'],
        size === SIZE_MD && ['w-8', 'h-8'],
        size === SIZE_LG && ['w-10', 'h-10'],
        className
      )}
    >
      {children}
    </div>
  )
}
